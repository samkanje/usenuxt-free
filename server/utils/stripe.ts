import { eq } from 'drizzle-orm'
import Stripe from 'stripe'
import type { Org } from '../database/schema'

const config = useRuntimeConfig()

const stripe = new Stripe(config.stripe.secretKey)

class StripeService {
  async getPrices() {
    const { data } = await stripe.prices.list({ expand: ['data.product'] })
    return data
  }

  async getProduct(productId: string) {
    const [product] = await db.select().from(tables.product).where(eq(tables.product.id, productId))
    return product
  }

  async updateProducts() {
    const prices = await this.getPrices()
    const products = this.pricesToProducts(prices)
    await db.delete(tables.product)
    await db.insert(tables.product).values(products)
  }

  pricesToProducts(prices: Stripe.Price[]) {
    const stripeProducts = prices.filter((price, index) => {
      const productId = (price.product as Stripe.Product).id
      const firstOcurrence = prices.findIndex(p => productId === (p.product as Stripe.Product).id)
      return firstOcurrence === index
    }).map(p => p.product as Stripe.Product)

    const products = stripeProducts.map((product) => {
      const monthlyPrice = prices.find(p => p.active && p.recurring?.interval === 'month' && product.id === (p.product as Stripe.Product).id)
      const yearlyPrice = prices.find(p => p.active && p.recurring?.interval === 'year' && product.id === (p.product as Stripe.Product).id)

      return {
        id: product.id,
        name: product.name,
        code: product.metadata.code,
        monthlyPrice: monthlyPrice?.unit_amount ?? 0,
        stripeMonthlyPriceId: monthlyPrice?.id ?? '',
        yearlyPrice: yearlyPrice?.unit_amount ?? 0,
        stripeYearlyPriceId: yearlyPrice?.id ?? '',
        features: product.features.map(f => f.name),
      }
    }).sort((a, b) => a.monthlyPrice - b.monthlyPrice)

    return products
  }

  async createCustomer(org: Org) {
    const customer = await stripe.customers.create({ name: org.name, email: org.email })
    await db.insert(tables.stripeCustomer).values({ id: customer.id, orgId: org.id, email: org.email })
    return customer
  }

  async getCustomer(org: Org) {
    const [customer] = await db.select().from(tables.stripeCustomer).where(eq(tables.stripeCustomer.orgId, org.id))
    return customer ?? this.createCustomer(org)
  }

  async getOrgForCustomerId(customerId: string) {
    const [orgCustomer] = await db.select().from(tables.org).leftJoin(tables.stripeCustomer, eq(tables.org.id, tables.stripeCustomer.orgId)).where(eq(tables.stripeCustomer.id, customerId))
    return orgCustomer?.org
  }

  async createCheckoutSession(priceId: string, customerId?: string) {
    return stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer: customerId,
      mode: 'subscription',
      success_url: `${config.public.url}/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${config.public.url}/`,
    })
  }

  async createPortalSession(stripeCustomerId: string, orgSlug: string) {
    return stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${config.public.url}/app/${orgSlug}/billing`,
    })
  }

  async validatePayment(session_id: string) {
    const session = await stripe.checkout.sessions.retrieve(session_id, { expand: ['subscription', 'subscription.plan.product'] })
    if (!session.status || session.status !== 'complete' || !session.customer)
      return
    const stripeCustomerId = session.customer as string
    let org = await this.getOrgForCustomerId(stripeCustomerId)
    if (!org) { // user paid for subscription before creating an account
      org = await orgService.create(session.customer_details?.name ?? '', session.customer_details?.email ?? '')
      await orgService.createInvite(org.id, session.customer_details?.email ?? '', 'owner')
      await this.createCustomer(org)
    }
    const stripeSubscription = session.subscription as Stripe.Subscription
    const productId = stripeSubscription.items.data[0].price.product as string
    const [product] = await db.select().from(tables.product).where(eq(tables.product.id, productId))
    await orgService.saveSubscription(org, stripeSubscription, product)
    return session
  }

  getStripeEvent(rawBody: string, stripeSignature: string) {
    return stripe.webhooks.constructEvent(rawBody, stripeSignature, config.stripe.webhookSecret)
  }
}

export const stripeService = new StripeService()
