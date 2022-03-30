import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query product($prod_id: Int!) {
    product(prod_id: $prod_id) {
      prod_id
      price
      title
      description
      category
      manufacturer
      quantity
      rating_id {
        title
        rating_id
        description
        rating
      }
    }
  }
`;