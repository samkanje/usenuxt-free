export default defineNitroPlugin(async () => {
  try {
    // eslint-disable-next-line no-console
    console.log('Updating stripe products')
    await stripeService.updateProducts()
  }
  catch (error) {
    console.error(error)
    console.error('Failed to update stripe products. Check your environment variables and database connection')
  }
})
