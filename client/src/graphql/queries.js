import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      deals {
        id
        name
        description
        detailedDescription
        expiresAt
        price
        imageUrl
      }
    }
  }
`;