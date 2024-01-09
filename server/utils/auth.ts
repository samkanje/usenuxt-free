import * as adapter from '@lucia-auth/adapter-postgresql'
import { google } from '@lucia-auth/oauth/providers'
import { lucia } from 'lucia'
import { h3 } from 'lucia/middleware'
import process from 'node:process'
import postgres from 'postgres'
import { userService } from './user'

const PASS_AUTH_KEY = 'password'
const config = useRuntimeConfig()

const sql = postgres(config.databaseUrl)
const auth = lucia({
  env: process.dev ? 'DEV' : 'PROD',
  middleware: h3(),
  adapter: adapter.postgres(sql, {
    user: 'auth_user',
    key: 'user_key',
    session: 'user_session',
  }),
  getUserAttributes: (user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    }
  },
})

export const googleAuth = google(auth, {
  clientId: config.google.clientId,
  clientSecret: config.google.clientSecret,
  scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
  redirectUri: `${config.public.url}/auth/google/callback`,
})

export type Auth = typeof auth

class AuthService {
  async createUser(name: string, email: string, password = '') {
    try {
      const user = await auth.createUser({
        key: { providerId: PASS_AUTH_KEY, providerUserId: email.toLowerCase(), password },
        attributes: { name, email },
      })

      if (!await userService.autoAcceptInvitations(email)) {
        const org = await orgService.create(name, email, user.id)
        await orgService.addMember(org.id, user.id, 'owner')
      }
      return user
    }
    catch (e) {
      console.error(`error creating user: ${email}`, e)
      return null
    }
  }

  async createSession(userId: string, event: any) {
    try {
      const session = await auth.createSession({ userId, attributes: {} })
      const authRequest = auth.handleRequest(event)
      authRequest.setSession(session)
      await userService.autoAcceptInvitations(session.user.email)
      return session
    }
    catch (e) {
      console.error(`error creating session: ${userId}`, e)
      return null
    }
  }

  async getSession(event: any) {
    const authRequest = auth.handleRequest(event)
    return authRequest.validate()
  }

  async logout(event: any) {
    const authRequest = auth.handleRequest(event)
    const session = await authRequest.validate()
    if (session) {
      await auth.invalidateSession(session.sessionId)
      authRequest.setSession(null)
    }
  }

  async passwordLogin(event: any, email: string, password: string) {
    const key = await auth.useKey(PASS_AUTH_KEY, email.toLowerCase(), password)
    return this.createSession(key.userId, event)
  }
}

export const authService = new AuthService()
