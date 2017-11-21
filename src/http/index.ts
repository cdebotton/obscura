import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as compress from 'koa-compress';
import { errorHandler } from './error-handler';
import { responseTime } from './response-time';

export const app = new Koa();

app.use(responseTime());
app.use(errorHandler());
app.use(bodyParser());
app.use(compress());
