import { Categorie } from '../models/Categorie';
const dummy = require('mongoose-dummy');
const ignoredFields = ['_id', 'created_at', '__v', /detail.*_info/];

export const typeDef = `
    type Categorie {
        _id: ID!
        name: String
    }

    input CategorieInput {
        name: String
    }

    extend type Query {
        categorieSchemaAssert: String
        categories: [Categorie]
        categorie(_id: ID!): Categorie
    }

    extend type Mutation {
        createCategorie(name: String!, description: String!): Boolean
        createCategorieWithInput(input: CategorieInput!): Categorie
        deleteCategorie(_id: ID!): Boolean
        updateCategorie(_id: ID!, input: CategorieInput!): Categorie
    }
`;

export const resolvers = {
  Query: {
    categorieSchemaAssert: async () => {
      return 'Hello world, from Categorie schema';
    },

    categories: async () => {
      let categories = [];
      for (let index = 0; index < 5; index++) {
        categories.push(
          dummy(Categorie, {
            ignore: ignoredFields,
            returnDate: false,
          })
        );
      }
      return categories;
    },

    categorie: async (root, { _id }, context, info) => {
      return dummy(Categorie, {
        ignore: ignoredFields,
        returnDate: false,
      });
    },
  },
  Mutation: {
    createCategorie: async (root, args, context, info) => {
      await Categorie.create(args);
      return Categorie.name;
    },

    createCategorieWithInput: async (root, { input }, context, info) => {
      return Categorie.create(input);
    },

    deleteCategorie: async (root, { _id }, context, info) => {
      return Categorie.remove({ _id });
    },

    updateCategorie: async (root, { _id, input }) => {
      return Categorie.findByIdAndUpdate(_id, input, { new: true });
    },
  },
};
