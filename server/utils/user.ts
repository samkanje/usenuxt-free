import { and, eq } from 'drizzle-orm'
import type { Org, OrgMember } from '../database/schema'

class UserService {
  async getById(id: string) {
    const [user] = await db.select().from(tables.user).where(eq(tables.user.id, id))
    return user
  }

  async getByEmail(email: string) {
    const [user] = await db.select().from(tables.user).where(eq(tables.user.email, email))
    return user
  }

  async getInvites(email: string, role?: OrgMember['role']) {
    const invites = await db.select().from(tables.orgInvitation).where(eq(tables.orgInvitation.email, email))
    if (role)
      return invites.filter(invite => invite.role === role)
    return invites
  }

  async autoAcceptInvitations(email: string) {
    const invites = await db.select().from(tables.orgInvitation).where(and(eq(tables.orgInvitation.email, email), eq(tables.orgInvitation.autoAccept, true)))
    if (!invites.length)
      return false
    invites.forEach(async invite => await orgService.acceptInvites(invite))
    await db.delete(tables.orgInvitation).where(eq(tables.orgInvitation.email, email))
    return true
  }

  async getDefaultUserRole(userId: string) {
    const defaultRole = (await this.getUserRoles(userId)).find(ur => ur.default)
    if (defaultRole)
      return defaultRole
    const org = await orgService.create(userId, 'owner')
    const userRole = await orgService.addMember(org.id, userId, 'owner')
    if (!userRole)
      return null
    return this.reduceUserRoles([{ org_member: userRole, org }])[0]
  }

  async getUserRoles(userId: string) {
    const userRoles = await db.select().from(tables.orgMember)
      .innerJoin(tables.org, eq(tables.org.id, tables.orgMember.orgId))
      .where(eq(tables.orgMember.userId, userId))
    return this.reduceUserRoles(userRoles)
  }

  private reduceUserRoles(userRoles: { org_member: OrgMember, org: Org }[]) {
    return userRoles.map((userRole) => {
      return {
        role: userRole.org_member.role,
        default: userRole.org.id === userRole.org_member.userId,
        org: userRole.org,
      }
    })
  }
}

export const userService = new UserService()
