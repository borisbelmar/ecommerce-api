import { ControllerError } from "@/errors/ControllerError"
import { signToken } from "@/lib/jwt"
import { checkPassword, hashPassword } from "@/lib/scrypt"
import getUserRepository from "@/repository/user.repository"
import { createUserSchema, loginSchema } from "@/validations/user.schema"
import { z } from "zod"

type LoginDTO = z.infer<typeof loginSchema>

export const loginUser = async (data: LoginDTO) => {
  const repository = getUserRepository()

  try {
    const validatedLogin = loginSchema.parse(data)
  
    const user = await repository.getUserByEmail(validatedLogin.email)
  
    if (!user) {
      throw new ControllerError(401, 'Invalid credentials')
    }
  
    const isPasswordValid = checkPassword(validatedLogin.password, user.password)

    if (!isPasswordValid) {
      throw new ControllerError(401, 'Invalid credentials')
    }

    const token = await signToken({
      sub: user.id,
      role: user.role
    })

    return {
      token
    }

  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ControllerError(400, error.message)
    }
    throw error
  }
}

type RegisterDTO = z.infer<typeof createUserSchema>

export const registerUser = async (data: RegisterDTO) => {
  const repository = getUserRepository()

  try {
    const validatedUser = createUserSchema.parse(data)
  
    const user = await repository.getUserByEmail(validatedUser.email)
  
    if (user) {
      throw new ControllerError(409, 'Email already in use')
    }

    const hashedPassword = await hashPassword(validatedUser.password)
  
    const newUser = await repository.createUser({
      ...validatedUser,
      password: hashedPassword,
      role: 'USER',
      scope: []
    })

    const token = await signToken({
      sub: newUser.id,
      role: newUser.role
    })
  
    return { token }
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ControllerError(400, error.message)
    }
    throw error
  }
}