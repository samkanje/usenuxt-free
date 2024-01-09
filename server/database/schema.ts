import { bigint, boolean, jsonb, pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core'

export const user = pgTable('auth_user', {
  id: varchar('id').primaryKey(),
  email: varchar('email').notNull().unique(),
  name: varchar('name').notNull(),
})

export type User = typeof user.$inferSelect

export const session = pgTable('user_session', {
  id: varchar('id').primaryKey(),
  userId: varchar('user_id').notNull().references(() => user.id),
  activeExpires: bigint('active_expires', { mode: 'number' }).notNull(),
  idleExpires: bigint('idle_expires', { mode: 'number' }).notNull(),
})

export const key = pgTable('user_key', {
  id: varchar('id').primaryKey(),
  userId: varchar('user_id', { length: 15 }).notNull().references(() => user.id),
  hashedPassword: varchar('hashed_password'),
})

export const org = pgTable('org', {
  id: varchar('id').primaryKey(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull(),
  slug: varchar('slug').notNull(),
})
export type Org = typeof org.$inferSelect

export const orgMember = pgTable('org_member', {
  userId: varchar('user_id').notNull().references(() => user.id),
  orgId: varchar('org_id').notNull().references(() => org.id),
  role: varchar('role', { enum: ['owner', 'admin', 'member'] }).notNull(),

}, (table) => {
  return {
    pk: primaryKey({ columns: [table.userId, table.orgId] }),
  }
})
export type OrgMember = typeof orgMember.$inferSelect

export const orgInvitation = pgTable('org_invitation', {
  email: varchar('email').notNull(),
  orgId: varchar('org_id').notNull().references(() => org.id),
  role: varchar('role', { enum: ['owner', 'admin', 'member'] }).notNull(),
  autoAccept: boolean('auto_accept').notNull().default(false),
}, (table) => {
  return {
    pd: primaryKey({ columns: [table.email, table.orgId] }),
  }
})
export type OrgInvitation = typeof orgInvitation.$inferSelect

export const product = pgTable('product', {
  id: varchar('id').primaryKey(),
  name: varchar('name').notNull(),
  code: varchar('code').notNull(),
  monthlyPrice: bigint('pricing_monthly', { mode: 'number' }).notNull(),
  stripeMonthlyPriceId: varchar('stripe_monthly_pricing_id').notNull(),
  yearlyPrice: bigint('pricing_yearly', { mode: 'number' }).notNull(),
  stripeYearlyPriceId: varchar('stripe_yearly_pricing_id').notNull(),
  features: jsonb('features').notNull(),
})

export type Product = typeof product.$inferSelect

export const stripeCustomer = pgTable('stripe_customer', {
  id: varchar('id').notNull().primaryKey(),
  email: varchar('email').notNull(),
  orgId: varchar('org_id').notNull().references(() => org.id),
})

export const subscription = pgTable('stripe_subscription', {
  stripeSubscriptionId: varchar('stripe_subscription_id').notNull().primaryKey(),
  orgId: varchar('org_id').notNull().references(() => org.id),
  name: varchar('name').notNull(),
  code: varchar('code').notNull(),
  interval: varchar('interval').default('month').notNull(),
  stripeCustomerId: varchar('stripe_customer_id').notNull(),
  expires: bigint('expires', { mode: 'number' }).notNull(),
})
