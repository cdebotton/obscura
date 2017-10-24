import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';
import render from './render';
import errors from './errors';
import responseTime from './responseTime';

const { PORT } = process.env;
if (!PORT) {
  throw new ReferenceError('process.env.PORT is undefined');
}

const app = new Koa();

app.proxy = true;

app.use(bodyParser());
app.use(compress());
app.use(responseTime());
app.use(errors());
app.use(render());

const server = app.listen(PORT, () => {
  const { address, port } = server.address();
  console.log(`Listening at ${address}${port}`);
});