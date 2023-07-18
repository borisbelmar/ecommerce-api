import { loginUser, registerUser } from "@/controllers/auth.controller"
import Router from "koa-router"

const authRouter = new Router()

authRouter.post('/login', async ctx => {
  const payload = ctx.request.body
  const response = await loginUser(payload)
  ctx.body = response
})

authRouter.post('/register', async ctx => {
  const payload = ctx.request.body
  const response = await registerUser(payload)
  ctx.body = response
})

export default authRouter