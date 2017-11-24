import * as bcrypt from 'bcryptjs';
import * as fs from 'fs';
import { makeExecutableSchema } from 'graphql-tools';
import * as path from 'path';
// import { Repository } from 'typeorm';
import { User } from '../data/entity/User';

const typeDefsFile = path.join(__dirname, 'typeDefs.graphql');
const typeDefs = fs.readFileSync(typeDefsFile, 'utf-8').toString();

// type Context = {
//   userRepository: Repository<User>;
// };

// type CreateUserArgs = {
//   username: string;
//   password: string;
//   email: string;
// };

const resolvers = {
  Query: {
    users: (_0: any, _1: any, { userRepository }: any) => {
      return userRepository.find();
    },
  },

  Mutation: {
    async createUser(
      _0: any,
      { username, email, password }: any,
      { userRepository }: any,
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
