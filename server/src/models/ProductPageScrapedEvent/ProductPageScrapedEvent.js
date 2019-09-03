const { scrapeProductPage } = require('./productPageScraper')
const db = require('../../db')

const recordProductPageScrapedEvent = async (asin, scrapeFn=scrapeProductPage) => {
  const data = await scrapeFn(asin)
  await db.save(data)
}

module.exports = { recordProductPageScrapedEvent }