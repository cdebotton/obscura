import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = `
  type User {
    id: Int!
    email: String!
    username: String!
    password: String!
  }

  type Query {
    users: [User]
  }
`;

const users = [{
  id: 1,
  email: 'admin@obscura.dev',
  username: 'admin',
  password: 'admin'
}, {
  id: 2,
  email: 'user@obscura.dev',
  username: 'user',
  password: 'user'
}, {
  id: 3,
  email: 'editor@obscura.dev',
  username: 'editor',
  password: 'editor'
}];

const resolvers = {
  Query: {
    users: () => users,
  }
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
