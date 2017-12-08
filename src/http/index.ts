import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as compress from 'koa-compress';
import * as mount from 'koa-mount';
import * as serve from 'koa-static';
import * as path from 'path';
import { errorHandler } from './error-handler';
import { responseTime } from './response-time';

export const app = new Koa();

app.use(responseTime());
app.use(errorHandler());
app.use(bodyParser());
app.use(compress());

if (process.env.NODE_ENV === 'production') {
  app.use(mount('/dist', serve(path.join(__dirname, '../../public/dist'))));
}
