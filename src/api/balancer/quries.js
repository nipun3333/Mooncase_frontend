export const getAuctionHistoryQuery = (poolId) => {
  return JSON.stringify({
    query: `{
        swaps(first: 1000, where: {poolId: "${poolId}"}, orderBy: timestamp, orderDirection: desc) {
          id
          caller
          tokenInSym
          tokenOutSym
          tokenAmountIn
          tokenAmountOut
          tx
          timestamp
        }
        tokenPrices(where:{poolId: "${poolId}"}, orderBy: timestamp, orderDirection: desc){
          pricingAsset
          price
          timestamp
        } 
    }
    `,
  });
};

export const getAuctionDetailsQuery = (pool) => {
  return JSON.stringify({
    query: 
    `{
      pools(where: {address: "${pool}"}) {
        id
        address
        strategyType
        symbol
        name
        swapEnabled
        swapFee
        owner
        totalWeight
        totalSwapVolume
        totalLiquidity
        createTime
        swapsCount
        tx
        tokensList
        tokens {
          symbol
          name
          address
          weight
          priceRate
          balance
        }

        weightUpdates(orderBy: scheduledTimestamp, orderDirection: asc) {
          scheduledTimestamp
          startTimestamp
          endTimestamp
          startWeights
          endWeights
          __typename
        }
      }
    }`
  })
}

export const getCurrentBalanceQuery = (pool) => {
  return JSON.stringify({
    query: `{
      pools(where: {address: "${pool}"}) {
        totalLiquidity
        tokens {
          symbol
          balance
         }
      }
    }`
  })
}