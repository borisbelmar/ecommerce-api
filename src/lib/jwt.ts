import { ControllerError } from '@/errors/ControllerError'
import { JWTPayload, jwtVerify, SignJWT } from 'jose'

export interface TokenPayload extends JWTPayload {
  sub: string
  iat: number
  exp: number
  role: string
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export const signToken = async (payload: Omit<TokenPayload, 'iat' | 'exp'>): Promise<string> => {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret)

  return jwt
}

export const verifyToken = async (token: string): Promise<TokenPayload> => {
  try {
    const result = await jwtVerify(token, secret, { algorithms: ['HS256'] })
  
    return result.payload as TokenPayload
  } catch (error) {
    throw new ControllerError(401, 'Invalid token')
  }
}
