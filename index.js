import { ApolloServer, gql } from 'apollo-server';
import { schema } from './src/schema';

const server = new ApolloServer({ schema })

server.listen().then(({ url }) => {
  console.log(`==> 🚀  Server ready at ${url} `);
});