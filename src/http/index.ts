import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as compress from 'koa-compress';
import * as Router from 'koa-router';

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(compress());
app.use(router.allowedMethods());
app.use(router.routes());

export { app };
