const { query } = require("./query");
const { productType } = require("./types");

const typeDefs = [query, productType];

module.exports = {
  typeDefs,
};
