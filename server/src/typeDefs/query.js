const { gql } = require("apollo-server")

const query = gql`
  type Query {
    product(asin: String): Product
  }
`

module.exports = {
  query,
}
