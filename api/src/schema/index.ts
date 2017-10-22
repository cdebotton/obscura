import bcrypt from 'bcrypt';
import { makeExecutableSchema } from 'graphql-tools';
import { Repository} from 'typeorm';
import { User } from '../entity/User'; 

const typeDefs = `
  type User {
    id: Int!
    email: String!
    username: String!
    password: String!
  }

  type Mutation {
    createUser(email: String!, username: String!, password: String!): User!
  }

  type Query {
    user(id: Int!): User
    users: [User]
  }
`;

type Context = {
  userRepository: Repository<User>;
};

type CreateUserArgs = {
  email: string;
  username: string;
  password: string;
};

type FindUserArgs = {
  id: number;
}

type Root = undefined;
type EmptyArgs = {};

const resolvers = {

  Mutation: {
    createUser(_root: Root, { username, email, password }: CreateUserArgs, { userRepository }: Context) {
      const user = new User();
      user.username = username;
      user.email = email;
      user.password = password;

      user.password = bcrypt.hashSync(password, 10);
 
      return userRepository.save(user);
    }
  },
  Query: {
    users(_root: Root, _args: EmptyArgs, { userRepository }: Context) {
      return userRepository.find();
    },

    user(_root: Root, { id }: FindUserArgs, { userRepository }: Context) {
      return userRepository.findOneById(id);
    }
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
