import 'reflect-metadata';

import { graphiqlKoa, graphqlKoa } from 'apollo-server-koa';
import * as Router from 'koa-router';
import * as path from 'path';
import * as React from 'react';
import { StaticRouter } from 'react-router';
import { createConnection } from 'typeorm';
import { schema } from './api/schema';
import { Html } from './components/templates/Html';
import { User } from './data/entity/User';
import { app } from './http/index';
import { render } from './http/render';
import { Root } from './pages/Root';
import { Emoji, start } from './utils/Logger';

const { PORT } = process.env;
if (!PORT) {
  throw new ReferenceError('process.env.PORT is undefined');
}

const createApp = async () => {
  const connection = await createConnection();
  const router = new Router();

  const userRepository = connection.getRepository(User);

  router.get(
    '/graphql',
    graphiqlKoa({
      endpointURL: '/graphql',
    }),
  );

  router.post(
    '/graphql',
    graphqlKoa(ctx => {
      return {
        schema,
        context: {
          userRepository,
          cookies: ctx.cookies,
        },
      };
    }),
  );

  app.use(router.allowedMethods());
  app.use(router.routes());

  app.use(
    render(ctx => {
      const manifest = require(path.join(process.cwd(), 'manifest.json'));

      return (
        <Html manifest={manifest}>
          <StaticRouter context={ctx} location={ctx.req.url}>
            <Root />
          </StaticRouter>
        </Html>
      );
    }),
  );

  const server = app.listen(PORT, () => {
    const { port } = server.address();
    start('http', `Listening on port ${port}`, Emoji.Rocket);
  });
};

createApp();
