import type Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const rawBody = await readRawBody(event)
  const stripeSignature = event.headers.get('stripe-signature')
  console.log('stripeSignature', stripeSignature)
  console.log('rawBody', rawBody)
  if (!stripeSignature || !rawBody) {
    throw createError({
      statusCode: 400,
      statusMessage: `Missing Stripe Signature`,
    })
  }

  const stripeEvent = await stripeService.getStripeEvent(rawBody, stripeSignature)
  if (!stripeEvent) {
    throw createError({
      statusCode: 400,
      statusMessage: `Error validating Webhook Event`,
    })
  }

  if (stripeEvent.type && stripeEvent.type.startsWith('customer.subscription')) {
    const subscription = stripeEvent.data.object as Stripe.Subscription
    try {
      const org = await stripeService.getOrgForCustomerId(subscription.customer.toString())
      const product = await stripeService.getProduct(subscription.items.data[0].plan.product?.toString() ?? 'X')
      orgService.saveSubscription(org, subscription, product)
    }
    catch (error) {
      console.error(error)
      throw createError({
        statusCode: 400,
        statusMessage: `Error validating Webhook Event`,
      })
    }
  }
  return `handled ${stripeEvent.type}.`
})
