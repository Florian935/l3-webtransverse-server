import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
    type User {
        name: String
        surname: String
        login: String
        pass: String
        token: String
        books: [Book]
    }
    type Book {
        name: String
        description: String
        categories: [Categorie]
    }
    type Categorie {
        name: String
    }
    type Query {
        users: [User]
        books: [Book]
        categories: [Categorie]
    }
`;


const users = [
    {
        name: 'Martin',
        surname: 'Florian',
        login: 'mflorian',
        pass: '1234',
        books: []
    },
];

const books = [
    {
        name: 'Harry Potter',
        description: 'Wonderful book',
        categories: [
            {
                name: 'Magical'
            }
        ]
    }
];

const categories = [
    {
        name: 'Magical'
    }
]


// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        users: () => users,
        books: () => books,
        categories: () => categories
    }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});