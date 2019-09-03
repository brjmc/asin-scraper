import React from 'react'
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo";

import { ProductSearch } from './components/productSearch'

const client = new ApolloClient({ uri: 'http://localhost:4000' })

const App = () => (
  <ApolloProvider client={client}>
    <ProductSearch />
  </ApolloProvider>
);

export default App;
