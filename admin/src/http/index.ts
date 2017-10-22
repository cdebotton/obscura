import Koa from 'koa';
import render from './render';

const { PORT } = process.env;
if (!PORT) {
  throw new ReferenceError('process.env.PORT is undefined');
}

const app = new Koa();

app.proxy = true;

app.use(render());

const server = app.listen(PORT, () => {
  const { address, port } = server.address();
  console.log(`Listening at ${address}${port}`);
});