import * as Koa from 'koa';

type Next = () => Promise<void> | void;

export const responseTime = () => async (ctx: Koa.Context, next: Next) => {
  const start = Date.now();
  await next();
  const delta = Date.now() - start;

  ctx.set('X-Response-Time', `${delta}ms`);
};
