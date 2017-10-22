import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
import { createConnection } from 'typeorm';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';
import Router from 'koa-router';
import { schema } from '../schema';
import { User } from '../entity/User';

const { PORT } = process.env;
if (!PORT) {
  throw new ReferenceError('process.env.PORT is undefined');
}

const app = new Koa();
const router = new Router();

const start = async () => {
  const connection = await createConnection();
  const userRepository = connection.getRepository(User);

  router.get('/', graphiqlKoa({
    endpointURL: '/',
  }));
  
  router.post('/', graphqlKoa(() => ({
    schema,
    context: { userRepository },
  })));
  
  app.use(bodyParser());
  app.use(compress());
  app.use(router.allowedMethods());
  app.use(router.routes());
  
  const server = app.listen(PORT, () => {
    const { address, port } = server.address();
    console.log(`Listening at ${address}${port}`);
  });
};

start();
