import React from 'react'
import styled from 'styled-components'

const SalesRankList = styled.ul`
  margin-top: 0;
`

const ProductDescription = styled.p`
  margin: 0 0 16px 0;
`

const ProductTitle = styled.h3`
  margin-bottom: 8px;
`

export const Product = ({title, description, dimensions, salesRank}) => {
  return (
    <div>
      <ProductTitle>{title}</ProductTitle>
      <ProductDescription>{description}</ProductDescription>
      <div><b>Product Dimensions:</b>&nbsp;{dimensions}</div><br/>
      <div><b>Sales Rank</b></div>
      <SalesRankList>{salesRank && salesRank.map((r, i) => <li key={i}>#{r.rank} in {r.category}</li>)}</SalesRankList>
    </div>
  )
}
