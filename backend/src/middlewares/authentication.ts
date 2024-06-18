import { verify } from "hono/jwt";

export const authentication = async (c:any, next:any)=>{
    const Token = c.req.header('Authorization');
    if (!Token) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
    const jwtToken = Token.split(' ')[1];
    const jwtSecret = c.env.JWT_SECRET;
    const payload = await verify(jwtToken, jwtSecret);
    if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	c.set('userId', payload.id);
	await next()
}