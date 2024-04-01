import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query product($prod_id: Int!, $name: String!) {
    product(prod_id: $prod_id) {
      prod_id
      price
      title
      description
      category
      manufacturer
      quantity

      rating

      images(take: 10, skip: 0) {
        id
        name
      }

      ratings(take: 3) {
        title
        rating
        description
        rating_id
      }
    }
    suggestions(name: $name) {
      prod_id
      title
      price
      images(take: 1) {
        name
      }
    }
  }
`;

export const GET_SUGGESTIONS = gql`
  query Suggestions($name: String!) {
    suggestions(name: $name) {
      prod_id
      title
      price
      images(take: 1) {
        name
      }
    }
  }
`;
