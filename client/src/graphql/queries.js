import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      filterName
      deals {
        id
        name
        description
        detailedDescription
        expiresAt
        discount
        price
        imageUrl
      }
    }
  }
`;