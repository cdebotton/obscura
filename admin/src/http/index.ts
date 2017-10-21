import Koa from 'koa';

const { PORT } = process.env;
if (!PORT) {
  throw new ReferenceError('process.env.PORT is undefined');
}

const app = new Koa();

app.use(ctx => {
  ctx.body = 'Hello, world!';
});

const server = app.listen(PORT, () => {
  const { address, port } = server.address();
  console.log(`Listening at ${address}${port}`);
});