import * as Koa from 'koa';
import * as merge2 from 'merge2';
import * as React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { StringStream } from './string-stream';

type AppCallback = (ctx: Koa.Context) => React.ReactElement<any>;

export const render = (appCallback: AppCallback) => (ctx: Koa.Context) => {
  const doctype = new StringStream('<!doctype>');
  const markup = renderToNodeStream(appCallback(ctx));

  ctx.set('Content-Type', 'text/html');
  ctx.body = merge2(doctype, markup);
};
