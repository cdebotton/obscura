import * as Koa from 'koa';
import * as merge2 from 'merge2';
import * as React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { StringStream } from './string-stream';

type AppCallback = (ctx: Koa.Context) => Promise<React.ReactElement<any>>;

export const render = (appCallback: AppCallback) => async (
  ctx: Koa.Context,
) => {
  const doctype = new StringStream('<!doctype>');
  const app = await appCallback(ctx);
  const markup = renderToNodeStream(app);

  ctx.set('Content-Type', 'text/html');
  ctx.body = merge2(doctype, markup);
};
