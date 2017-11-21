import * as bcrypt from 'bcryptjs';
import * as fs from 'fs';
import { makeExecutableSchema } from 'graphql-tools';
import * as path from 'path';
import { Repository } from 'typeorm';
import { User } from '../data/entity/User';

const typeDefsFile = path.join(__dirname, 'typeDefs.graphql');
const typeDefs = fs.readFileSync(typeDefsFile, 'utf-8').toString();

type Root = undefined;

type Context = {
  userRepository: Repository<User>;
};

type CreateUserArgs = {
  username: string;
  password: string;
  email: string;
};

const resolvers = {
  Query: {
    users(_0: Root, _1: Root, { userRepository }: Context) {
      return userRepository.find();
    },
  },

  Mutation: {
    async createUser(
      _0: Root,
      { username, email, password }: CreateUserArgs,
      { userRepository }: Context,
    ) {
      const user = new User();

      user.email = email;
      user.username = username;
      user.password = await bcrypt.hash(password, 10);

      await userRepository.save(user);

      return user;
    },
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
