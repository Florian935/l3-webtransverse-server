import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

import {
  typeDef as User,
  resolvers as userResolvers,
} from './schema/user.schema';

import {
  typeDef as Categorie,
  resolvers as categorieResolvers,
} from './schema/categorie.schema';

import {
  typeDef as Book,
  resolvers as bookResolvers,
} from './schema/book.schema';

const Query = `
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  type Subscription {
    _empty: String
  }
`;

const resolvers = {};

// Do not forget to merge at the end of typeDefs and resolvers
export const schema = makeExecutableSchema({
  typeDefs: [Query, User, Categorie, Book],
  resolvers: merge(resolvers, userResolvers, categorieResolvers, bookResolvers),
});
