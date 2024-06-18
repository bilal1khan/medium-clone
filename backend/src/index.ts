import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { user } from './routes/user';
import { blog } from './routes/blog';

const app = new Hono<{
  Bindings:{
    DATABASE_URL : string,
    JWT_SECRET : string
  }
}>();

import { cors } from 'hono/cors';

app.use('/*', cors());

app.route('/api/v1/user', user );
app.route('/api/v1/blog', blog);

export default app
