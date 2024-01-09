import { drizzle } from 'drizzle-orm/postgres-js'
import process from 'node:process'
import postgres from 'postgres'
import * as schema from '~/server/database/schema'

export * as tables from '~/server/database/schema'

const client = postgres(process.env.DATABASE_URL!)
export const db = drizzle(client, { schema })
