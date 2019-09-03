const { gql } = require("apollo-server");

const productType = gql`
  type SalesRank {
    category: String
    rank: Int
  }

  type Product {
    asin: String
    title: String
    description: String
    dimensions: String
    salesRank: [SalesRank]
  }
`

module.exports = {
  productType,
};
