export const graphqlNftsByCollectionsQuery = (
  address: string, 
  collections: string,
  offset: number = 0,
  limit: number = 10,
) => `
  query MyQuery {
    current_token_ownerships_v2(
      limit: ${limit},
      offset: ${offset},
      where: {
        owner_address: {_eq: "${address}"}, 
        current_token_data: {collection_id: {_in: ${collections}}},
        amount: {_gt: "0"}
      }
    ) {
      owner_address
      token_data_id,
      amount
      current_token_data {
        token_name
        cdn_asset_uris {
          cdn_image_uri
        }
      }
    }
  }
`;