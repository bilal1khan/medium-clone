import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { authentication } from "../middlewares/authentication";
import { createPostInput, updatePostInput } from "@bilalkhan01/medium-common";

export const blog = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables:{
    userId: string
  };
}>();


blog.post("/", authentication ,async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get('userId');

  const body = await c.req.json();

  const {success} = createPostInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      error: "Invalid Create Post Inputs"
    });
  }

  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId
      }
    });
    
    //console.log(post);
    return c.json({"id" :post.id});
  } catch (error) {
    return c.json({"message": "Unable to post blog"})
  }
});

blog.put("/",authentication, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  
  const userId = c.get('userId');

  const body = await c.req.json();

  const {success} = updatePostInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      error: "Invalid Update Post Inputs"
    });
  }

  try {
    const post = await prisma.post.update({
      where: {
        id: body.id,
        authorId: userId
      },
      data: {
        title: body.title,
        content: body.content
      }
    });
  
    return c.json({"updated post": post});
  } catch (error) {
    return c.json({"message": "Unable to post blog"})
  }
});

blog.get("/bulk", async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const posts = await prisma.post.findMany({
    select: {
        content: true,
        title: true,
        id: true,
        author: {
            select: {
                name: true
            }
        }
    }});

  return c.json(posts);
});

blog.get("/:id", async(c) => {
  const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const post = await prisma.post.findUnique({
		where: {
			id
		},
    select: {
      id: true,
      title: true,
      content: true,
      author: {
          select: {
              name: true
          }
      }
  }
	});

	return c.json(post);
});