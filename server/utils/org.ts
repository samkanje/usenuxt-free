import { and, eq, gte } from 'drizzle-orm'
import slugify from 'slugify'
import type Stripe from 'stripe'
import { uid } from 'uid/secure'
import type { Org, OrgMember, Product, User } from '../database/schema'
import { userService } from './user'

class OrgService {
  async create(name: string, email: string, id?: string) {
    const slug = await this.createSlug(name)
    const [org] = await db.insert(tables.org).values({ id: id ?? uid(), name, slug, email }).returning()
    await stripeService.createCustomer(org)
    return org
  }

  async getOrgBySlug(slug: string, userId?: string, role?: OrgMember['role']) {
    const [org] = await db.select().from(tables.org).where(eq(tables.org.slug, slug))
    if (!org)
      return null
    if (userId && !(await this.isMember(org.id, userId, role)))
      return null
    return org
  }

  async getOrgById(id: string, userId?: string, role?: OrgMember['role']) {
    const [org] = await db.select().from(tables.org).where(eq(tables.org.id, id))
    if (userId && !(await this.isMember(org.id, userId, role)))
      return null
    return org
  }

  async getOrg(user: User, slug: string) {
    const [org] = await db.select().from(tables.org).leftJoin(tables.orgMember, eq(tables.orgMember.orgId, tables.org.id)).where(and(eq(tables.org.slug, slug), eq(tables.orgMember.userId, user.id)))
    return org?.org
  }

  async saveSubscription(org: Org, stripeSubscription: Stripe.Subscription, product: Product) {
    const code = product.code
    const name = product.name
    const interval = stripeSubscription.items.data[0].plan.interval as string
    const stripeCustomerId = stripeSubscription.customer as string
    const stripeSubscriptionId = stripeSubscription.id
    const expires = stripeSubscription.current_period_end * 1000
    const orgId = org.id

    const [subscription] = await db.insert(tables.subscription)
      .values({ code, name, stripeCustomerId, stripeSubscriptionId, interval, expires, orgId })
      .onConflictDoUpdate({ target: tables.subscription.stripeSubscriptionId, set: { code, name, stripeSubscriptionId, interval, expires } }).returning()

    return subscription
  }

  async getSubscription(orgId: string) {
    const [subscription] = await db.select().from(tables.subscription).where(and(eq(tables.subscription.orgId, orgId), gte(tables.subscription.expires, Date.now())))
    return subscription
  }

  async addMember(orgId: string, userId: string, role: OrgMember['role']) {
    if (await this.isMember(orgId, userId))
      return null
    const [userRole] = await db.insert(tables.orgMember).values({ orgId, userId, role }).returning()
    return userRole
  }

  async getMembers(org: Org) {
    const members = await db.select().from(tables.orgMember)
      .innerJoin(tables.user, eq(tables.user.id, tables.orgMember.userId))
      .where(eq(tables.orgMember.orgId, org.id))
    return members.map(m => ({ ...m.auth_user, role: m.org_member.role }))
  }

  async createInvite(orgId: string, email: string, role: OrgMember['role'], autoAccept = false) {
    const user = await userService.getByEmail(email)
    if (await this.isMember(orgId, user?.id ?? '') || await this.isInvited(orgId, email))
      return null
    const [orgInvitation] = await db.insert(tables.orgInvitation).values({ orgId, email, role, autoAccept }).returning()
    return orgInvitation
  }

  async getInvites(orgId: string) {
    return db.select().from(tables.orgInvitation).where(eq(tables.orgInvitation.orgId, orgId))
  }

  async acceptInvites(invitation: { email: string, orgId: string, role: OrgMember['role'] }) {
    const user = await userService.getByEmail(invitation.email)
    if (!user)
      return null
    const userRole = await this.addMember(invitation.orgId, user.id, invitation.role)
    if (!userRole)
      return null
    await db.delete(tables.orgInvitation).where(and(eq(tables.orgInvitation.orgId, invitation.orgId), eq(tables.orgInvitation.email, invitation.email)))
    return userRole
  }

  async createSlug(name: string, withRandom = false): Promise<string> {
    const slug = slugify(name, { lower: true, trim: true }) + (withRandom ? `-${uid(3)}` : '')
    const org = await db.select().from(tables.org).where(eq(tables.org.slug, slug))
    if (org.length)
      return this.createSlug(name, true)
    return slug
  }

  async isMember(orgId: string, userId: string, role?: OrgMember['role']) {
    const [orgMember] = await db.select().from(tables.orgMember).where(and(eq(tables.orgMember.orgId, orgId), eq(tables.orgMember.userId, userId)))
    if (role)
      return !!orgMember && orgMember.role === role
    return !!orgMember
  }

  async isInvited(orgId: string, email: string, role?: OrgMember['role']) {
    const [orgInvitation] = await db.select().from(tables.orgInvitation).where(and(eq(tables.orgInvitation.orgId, orgId), eq(tables.orgInvitation.email, email)))
    if (role)
      return !!orgInvitation && orgInvitation.role === role
    return !!orgInvitation
  }
}

export const orgService = new OrgService()
