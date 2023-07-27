import { ControllerError } from "@/errors/ControllerError";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Context, Next } from "koa";

export default async function errorHandler (ctx: Context, next: Next) {
  try {
    await next()
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === 'P2023') {
        ctx.status = 404
        ctx.body = {
          message: 'Not found'
        }
        return
      }
    }
    if (err instanceof ControllerError) {
      ctx.status = err.code
      ctx.body = {
        message: err.message
      }
      return
    }
    console.log('Uncontrolled error', err)
    ctx.status = 500
    ctx.body = {
      message: 'Internal Server Error'
    }
  }
}