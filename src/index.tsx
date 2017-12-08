import 'reflect-metadata';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { graphiqlKoa, graphqlKoa } from 'apollo-server-koa';
import * as Router from 'koa-router';
import * as nodeFetch from 'node-fetch';
import * as path from 'path';
import * as React from 'react';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { StaticRouter } from 'react-router';
import { createConnection } from 'typeorm';
import { schema } from './api/schema';
import { User } from './data/entity/User';
import { Html } from './http/Html';
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
        context: {
          cookies: ctx.cookies,
          userRepository,
        },
        schema,
      };
    }),
  );

  app.use(router.allowedMethods());
  app.use(router.routes());

  app.use(
    render(async ctx => {
      const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: createHttpLink({
          credentials: 'same-origin',
          fetch: nodeFetch as any, // TODO: Gross,
          headers: {
            cookie: ctx.cookies,
          },
          uri: 'http://localhost:3000/graphql',
        }),
        ssrMode: true,
      });

      const root = (
        <ApolloProvider client={client}>
          <StaticRouter context={ctx} location={ctx.req.url}>
            <Root />
          </StaticRouter>
        </ApolloProvider>
      );

      await getDataFromTree(root);

      const initialState = client.cache.extract();
      const manifest = require(path.join(process.cwd(), 'manifest.json'));

      return (
        <Html manifest={manifest} state={initialState}>
          {root}
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
