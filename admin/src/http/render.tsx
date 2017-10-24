import Koa from 'koa';
import merge2 from 'merge2';
import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import Html from '../components/templates/Html';
import Root from '../containers/Root';
import { stringToStream } from './utils';

const render = () => (ctx: Koa.Context) => {
  const doctype = stringToStream('<!doctype html>');
  const markup = renderToNodeStream(
    <StaticRouter context={ctx} location={ctx.req.url}>
      <Html>
        <Root />
      </Html>
    </StaticRouter>,
  );
  ctx.set('Content-Type', 'text/html');
  ctx.body = merge2(doctype, markup);
};

export default render;
