const { Product, recordProductPageScrapedEvent } = require("../models")

const productsResolvers = {
  Query: {
    product: async (_, { asin }) => {
      try {
        await recordProductPageScrapedEvent(asin)
      } catch (err) {
        if (err.statusCode === 404) return null

        throw err
      }

      const product = new Product(asin)
      await product.hydrate()
      return product
    },
  },
}

module.exports = {
  productsResolvers,
}
