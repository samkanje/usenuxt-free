import { defineConfig } from 'drizzle-kit'
import process from 'node:process'

export default defineConfig({
  schema: './server/database/schema.ts',
  out: 'server/database/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.NUXT_DATABASE_URL!,
  },
})
