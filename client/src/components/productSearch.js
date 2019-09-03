import React, { useState } from 'react'
import { ApolloConsumer } from 'react-apollo'
import { gql } from 'apollo-boost'
import styled from 'styled-components'
import { isNil } from 'lodash'

import { Product } from './product'
import { ProductNotFound } from './productNotFound'

const Wrapper = styled.div`
  width: 25%;
  margin: 0 auto;
`

const productQuery = gql`
  query Product($asin: String!) {
    product(asin: $asin) {
      asin
      title
      description
      dimensions
      salesRank {
        rank
        category
      }
    }
  }
`

const submitQuery = (client, asin, setProduct, setIsPristine) => {
  return async () => {
    const { data } = await client.query({
      query: productQuery,
      variables: { asin }
    })

    setIsPristine(false)
    setProduct(data.product)
  }
}

const renderProductInfo = (product, isPristine) => {
  if(isNil(product) && isPristine) return
  if(isNil(product)) return <ProductNotFound />
  return <Product {...product}/>
}

export const ProductSearch = () => {
  const [product, setProduct] = useState(null)
  const [asin, setAsin] = useState('')
  const [isPristine, setIsPristine] = useState(true)

  return (
    <Wrapper>
      <h1>Search Amazon Products By ASIN</h1>
      <ApolloConsumer>
        {client => (
          <div>
            <input type="text" placeholder="input product asin" value={asin} onChange={e => setAsin(e.target.value)}/>
            <button onClick={submitQuery(client, asin, setProduct, setIsPristine)}>Search</button>
            {renderProductInfo(product, isPristine)}
          </div>
        )}
      </ApolloConsumer>
    </Wrapper>
  )
}
