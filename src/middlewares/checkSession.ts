import { ControllerError } from '@/errors/ControllerError'
import { verifyToken } from '@/lib/jwt'
import { Context, Next } from 'koa'

interface Options {
  isAdminRequired?: boolean
}

export default function checkSession(options: Options = {}) {
  return async (ctx: Context, next: Next) => {
    const { isAdminRequired } = options
    
    const bearerToken = ctx.headers.authorization

    const token = bearerToken?.split(' ')[1]

    if (!token) {
      throw new ControllerError(401, 'No token provided')
    }

    const { sub, role } = await verifyToken(token)

    ctx.state.user = {
      id: sub,
      role
    }

    if (isAdminRequired && role !== 'ADMIN') {
      throw new ControllerError(403, 'Admin role required')
    }

    await next()
  }
}