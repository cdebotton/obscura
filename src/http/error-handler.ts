import * as Koa from 'koa';

type Next = () => Promise<void> | void;

export const errorHandler = () => async (ctx: Koa.Context, next: Next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
};
