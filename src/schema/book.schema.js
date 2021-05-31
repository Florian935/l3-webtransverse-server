import { Book } from '../models/Book';
const dummy = require('mongoose-dummy');
const ignoredFields = ['_id', 'created_at', '__v', /detail.*_info/];

export const typeDef = `
    type Book {
        _id: ID!
        name: String
        description: String
        categories: [Categorie]
    }

    input BookInput {
        name: String
        description: String
    }

    extend type Query {
        bookSchemaAssert: String
        books: [Book]
        book(_id: ID!): Book
    }

    extend type Mutation {
        createBook(name: String!, description: String!): String
        createBookWithInput(input: BookInput!): Book
        deleteBook(_id: ID!): Boolean
        updateBook(_id: ID!, input: BookInput!): Book
    }
`;

export const resolvers = {
  Query: {
    bookSchemaAssert: async () => {
      return 'Hello world, from Book schema';
    },

    books: async () => {
      return Book.find();
    },

    book: async (root, { _id }, context, info) => {
      return dummy(Book, {
        ignore: ignoredFields,
        returnDate: false,
      });
    },
  },
  Mutation: {
    createBook: async (root, args, context, info) => {
      await Book.create(args);
      return Book.name;
    },

    createBookWithInput: async (root, { input }, context, info) => {
      return Book.create(input);
    },

    deleteBook: async (root, { _id }, context, info) => {
      return Book.remove({ _id });
    },

    updateBook: async (root, { _id, input }) => {
      return Book.findByIdAndUpdate(_id, input, { new: true });
    },
  },
};
