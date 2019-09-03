const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./src/db/db.json', { defaultValue: { productPagedScrapedEvents: [] } })
const db = new low(adapter)

db.defaults({ productPagedScrapedEvents: [] })
  .write()

const save = async (event) => {
  await db.get('productPagedScrapedEvents')
    .push(event)
    .write()
}

const findProductDetailsByASIN = async (asin) => {
  const productPageScrapedEvent = await db.get('productPagedScrapedEvents')
    .filter({ asin })
    .orderBy('created', ['desc'])
    .first()
    .value()

  return productPageScrapedEvent
}

module.exports = { save, findProductDetailsByASIN }