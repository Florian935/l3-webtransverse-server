import { ApolloServer } from 'apollo-server';
import { schema } from './src/schema';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`==> 🚀  Server ready at ${url} `);
});
