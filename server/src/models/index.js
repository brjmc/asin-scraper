const { Product } = require('./Product')
const { recordProductPageScrapedEvent } = require('./ProductPageScrapedEvent')

module.exports = {
  Product,
  recordProductPageScrapedEvent,
}
