import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import process from 'node:process'
import postgres from 'postgres'

const config = useRuntimeConfig()

export default defineNitroPlugin(async () => {
  if (process.dev)
    return
  // eslint-disable-next-line no-console
  console.log('Running db migration')
  const sql = postgres(config.databaseUrl, { max: 1 })
  const db = drizzle(sql)
  await migrate(db, { migrationsFolder: 'server/database/migrations' })
  await sql.end()
})
