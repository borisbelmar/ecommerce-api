import { ControllerError } from "@/errors/ControllerError";
import { Context, Next } from "koa";

export default async function errorHandler (ctx: Context, next: Next) {
  try {
    await next()
  } catch (err) {
    if (err instanceof ControllerError) {
      ctx.status = err.code
      ctx.body = {
        message: err.message
      }
    } else {
      console.log('Uncontrolled error', err)
      ctx.status = 500
      ctx.body = {
        message: 'Internal Server Error'
      }
    }
  }
}