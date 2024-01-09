export default defineEventHandler(async () => {
  return db.select().from(tables.product)
})
