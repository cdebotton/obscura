import * as path from 'path';
import * as React from 'react';
import { StaticRouter } from 'react-router';
import { Html } from './components/templates/Html';
import { app } from './http/index';
import { render } from './http/render';
import { Root } from './pages/Root';
import { Emoji, start } from './utils/Logger';

const { PORT } = process.env;
if (!PORT) {
  throw new ReferenceError('process.env.PORT is undefined');
}

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
