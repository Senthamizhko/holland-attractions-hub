import { ApolloServer, gql } from 'apollo-server';
import { categories } from './data/mock.js';

export const typeDefs = gql`
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
  filterName: String!
  imageUrl: String!
  deals: [Deal!]!
}

type Query {
  categories: [Category!]!
}
`;

export const resolvers = {
  Query: {
    categories: () => categories,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
console.log(`Lets goooo!! Server ready at ${url}`);
});