import Koa from 'koa';

const responseTime = () => async (ctx: Koa.Context, next: () => Promise<void>) => {
  const start = Date.now();
  await next();
  const delta = `${Date.now() - start}ms`;
  ctx.set('X-Response-Time', delta);
};

export default responseTime;