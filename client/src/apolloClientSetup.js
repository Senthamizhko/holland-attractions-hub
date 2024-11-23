import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Update the backend GraphQL URL if you test on different port
  cache: new InMemoryCache(),
});

export default client;