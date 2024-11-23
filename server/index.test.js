import { ApolloServer } from '@apollo/server';
import { gql } from 'graphql-tag';
import { categories } from './data/mock';

const typeDefs = gql`
  type Deal {
    id: ID!
    name: String!
    description: String!
    detailedDescription: String!
    price: Float!
    discount: Int!
    expiresAt: String!
    imageUrl: String!
  }

  type Category {
    id: ID!
    name: String!
    imageUrl: String!
    deals: [Deal!]!
  }

  type Query {
    categories: [Category!]!
  }
`;

let resolvers = {
  Query: {
    categories: () => {
      console.log('Resolving categories:', categories); // Check mock data
      return categories;
    },
  },
};

describe('Apollo Server', () => {
  let server;

  beforeAll(async () => {
    server = new ApolloServer({
      typeDefs,
      resolvers,
    });
    await server.start();
  });

  afterAll(async () => {
    await server.stop();
  });

  it('fetches all categories', async () => {
    const query = `
      query {
        categories {
          id
          name
        }
      }
    `;
    const response = await server.executeOperation({ query });

    console.log('Response:', response);

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.categories).toBeDefined();
    expect(Array.isArray(response.body.singleResult.data?.categories)).toBe(true); // Ensure categories is an array
    expect(response.body.singleResult.data.categories.length).toBeGreaterThan(0); // Check that there are categories
  });

  it('returns an empty array if no categories exist', async () => {
    resolvers = {
      Query: {
        categories: () => [],
      },
    };

    await server.stop(); 
    server = new ApolloServer({ typeDefs, resolvers }); 
    await server.start();

    const query = `
      query {
        categories {
          id
          name
        }
      }
    `;

    const response = await server.executeOperation({ query });

    console.log('Empty Categories Response:', response);

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.categories).toEqual([]); // Expect an empty array
  });
});