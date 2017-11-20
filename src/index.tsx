import * as path from 'path';
import * as React from 'react';
import { Html } from './components/templates/Html';
import { Root } from './containers/Root';
import { app } from './http/index';
import { render } from './http/render';
import { Emoji, start } from './utils/Logger';

const { PORT } = process.env;
if (!PORT) {
  throw new ReferenceError('process.env.PORT is undefined');
}

app.use(
  render(() => {
    const manifest = require(path.join(process.cwd(), 'manifest.json'));

    return (
      <Html manifest={manifest}>
        <Root />
      </Html>
    );
  }),
);

const server = app.listen(PORT, () => {
  const { port } = server.address();
  start('http', `Listening on port ${port}`, Emoji.Rocket);
});
