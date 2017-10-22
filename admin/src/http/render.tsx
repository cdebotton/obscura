import Koa from 'koa';
import OrderedStreams from 'ordered-read-streams';
import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import Html from '../components/templates/Html';
import { stringToStream } from './utils';

const render = () => (ctx: Koa.Context) => {
  const doctype = stringToStream('<!doctype html>');
  const markup = renderToNodeStream(<Html />);

  ctx.set('Content-Type', 'text/html');
  ctx.body = new OrderedStreams(doctype, markup);
};

export default render;
