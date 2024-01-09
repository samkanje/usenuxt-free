import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const session = await authService.getSession(event)
  const { context: { params } } = event
  if (!session?.user || !params?.slug)
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  const org = await orgService.getOrg(session.user, params.slug)

  if (!org)
    throw createError({ statusCode: 404, statusMessage: 'Not Found' })
  const [sub] = await db.select().from(tables.subscription).where(eq(tables.subscription.orgId, org.id))

  return { org, subscription: sub }
})
