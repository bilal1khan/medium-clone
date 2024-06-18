import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign} from 'hono/jwt'
import { signupInput, signinInput } from '@bilalkhan01/medium-common';


export const user = new Hono<{
    Bindings:{
      DATABASE_URL : string,
      JWT_SECRET : string
    }
  }>();

user.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        error: "Invalid Signup Inputs"
      });
    }
    try {
      const user = await prisma.user.create({
        data:{
          email: body.email,
          password: body.password,
          name : body.name
        }
      });

      const payload = {id: user.id};
      const secret = c.env.JWT_SECRET;

      const jwtToken = await sign(payload, secret);
      return c.json({jwtToken});
    } catch (e) {
      c.status(401);
      return c.json({ "error": "error while signing up" });
    }
})

user.post('/signin', async (c) => {
  
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const {success} = signinInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      error: "Invalid Signin Inputs"
    });
  }

  const secret = c.env.JWT_SECRET;
  try {
    const user = await prisma.user.findFirst({
      where:{
        email: body.email,
        password: body.password
      }
    });
    if(!user){
      c.status(401);
      return c.json({error : "User not found"});
    }
    
    const jwtToken = await sign({id: user.id}, secret);
    return c.json({jwtToken});

  } catch (e) {
    c.status(401);
    return c.json({ error: "error while signing up" });
  }
})