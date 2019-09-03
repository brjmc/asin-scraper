const cheerio = require('cheerio')
const request = require('request-promise-native')

const requestOptions = (asin) => {
  return {
    uri: `https://www.amazon.com/dp/${asin}`,
    transform: body => cheerio.load(body, { normalizeWhitespace: true }),
    gzip: true,
    headers: {
      'Accept-Encoding': 'gzip'
    }
  }
}

const getHtml = async (asin) => request(requestOptions(asin))

const parseSalesRank = str => {
  let [rank, category] = str.split('in').map(str => str.trim())
  const indexOfParenth = category.indexOf('(')
  if (indexOfParenth > 0 ) category = category.substr(0, indexOfParenth).trim()
  return { rank, category }
}

const scrapeProductPage = async (asin) => {
  const $ = await getHtml(asin)

  const title = $('#productTitle').text().trim()
  const description = $('p', '#productDescription').first().text().trim()
  const dimensions = $('.size-weight .value', '#prodDetails').last().text().trim()
  const salesRank = $('.value', "#SalesRank")
    .text()
    .trim()
    .split('\n')
    .join('')
    .split('#')
    .filter(str => str.length > 0)
    .map(str => parseSalesRank(str))

  return {
    asin,
    title,
    description,
    dimensions,
    salesRank,
    created: Date.now()
  }
}

module.exports = { scrapeProductPage }