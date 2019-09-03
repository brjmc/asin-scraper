const db = require('../db')

class Product {
  constructor(asin) {
    this.asin = asin
  }

  async hydrate() {
    const data = await db.findProductDetailsByASIN(this.asin)
    Object.assign(this, data)
  }

  toObject() {
    const { asin, title, description, dimensions, saleRank, create } = this
    return { asin, title, description, dimensions, saleRank, create }
  }
}

module.exports = {
  Product,
}