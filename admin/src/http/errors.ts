import Koa from 'koa';

const errors = () => async (ctx: Koa.Context,  next: () => Promise<void>) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.toString();
    ctx.app.emit('error', err, ctx);
  }
};

export default errors;