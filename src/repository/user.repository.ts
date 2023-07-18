import { User } from "@prisma/client"
import prismaClient from "@/lib/prismaClient"

interface UserRepository {
  getAllUsers(): Promise<User[]>
  getUserById(id: string): Promise<User | null>
  getUserByEmail(email: string): Promise<User | null>
  createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>
  updateUser(id: string, user: Partial<User>): Promise<User>
  deleteUser(id: string): Promise<User>
}

export default function getUserRepository(): UserRepository {
  const getAllUsers = async () => {
    return await prismaClient.user.findMany()
  }

  const getUserById = async (id: string) => {
    return await prismaClient.user.findUnique({
      where: { id },
    })
  }

  const getUserByEmail = async (email: string) => {
    return await prismaClient.user.findUnique({
      where: { email },
    })
  }

  const createUser = async (user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
    return await prismaClient.user.create({
      data: user,
    })
  }

  const updateUser = async (id: string, user: Partial<User>) => {
    return await prismaClient.user.update({
      where: { id },
      data: user,
    })
  }

  const deleteUser = async (id: string) => {
    return await prismaClient.user.delete({
      where: { id },
    })
  }

  return {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
  }
}