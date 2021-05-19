import { User } from '../models/User';
const dummy = require('mongoose-dummy');
const ignoredFields = ['_id', 'created_at', '__v', /detail.*_info/];

export const typeDef = `
    type User {
        _id: ID!
        name: String
        surname: String
        login: String
        pass: String
        token: String
        books: [Book]
    }

    input UserInput {
        name: String
        surname: String
        login: String
        pass: String
        token: String
    }

    extend type Query {
        userSchemaAssert: String
        users: [User]
        user(_id: ID!): User
    }

    extend type Mutation {
        createUser(name: String!,surname: String!): String
        createUserWithInput(input: UserInput!): User
        deleteUser(_id: ID!): Boolean
        updateUser(_id: ID!, input: UserInput!): User
        addBook(_id: ID!, book: BookInput): User
    }
`;

export const resolvers = {
  Query: {
    userSchemaAssert: async () => {
      return 'Hello world, from User schema';
    },

    users: async () => {
      let users = [];
      for (let index = 0; index < 5; index++) {
        users.push(
          dummy(User, {
            ignore: ignoredFields,
            returnDate: false,
          })
        );
      }
      return users;
    },

    user: async (root, { _id }, context, info) => {
      return dummy(User, {
        ignore: ignoredFields,
        returnDate: false,
      });
    },
  },
  Mutation: {
    createUser: async (root, args, context, info) => {
      await User.create(args);
      return User.name;
    },

    createUserWithInput: async (root, { input }, context, info) => {
      return User.create(input);
    },

    deleteUser: async (root, { _id }, context, info) => {
      const { deletedCount } = await User.deleteOne({ _id });

      return deletedCount === 0 ? false : true;
    },

    updateUser: async (root, { _id, input }) => {
      return User.findByIdAndUpdate(_id, input, { new: true });
    },

    addBook: async (root, { _id, book }) => {
      return User.findByIdAndUpdate(_id, book, { new: true });
    },
  },
};
