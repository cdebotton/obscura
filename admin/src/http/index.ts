import errors from '@http/errors';
import render from '@http/render';
import responseTime from '@http/responseTime';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';

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
  process.stdout.write(`Listening at ${address}${port}`);
});