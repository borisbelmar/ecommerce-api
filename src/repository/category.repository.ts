import { Category } from "@prisma/client"
import prismaClient from "@/lib/prismaClient"

interface CategoryRepository {
  getAllCategories(): Promise<Category[]>
  getCategoryById(id: string): Promise<Category | null>
  createCategory(category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category>
  updateCategory(id: string, category: Partial<Category>): Promise<Category>
  deleteCategory(id: string): Promise<Category>
}

export default function getCategoryRepository(): CategoryRepository {
  const getAllCategories = async () => {
    return await prismaClient.category.findMany()
  }

  const getCategoryById = async (id: string) => {
    return await prismaClient.category.findUnique({
      where: { id },
    })
  }

  const createCategory = async (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => {
    return await prismaClient.category.create({
      data: category,
    })
  }

  const updateCategory = async (id: string, category: Partial<Category>) => {
    return await prismaClient.category.update({
      where: { id },
      data: category,
    })
  }

  const deleteCategory = async (id: string) => {
    return await prismaClient.category.delete({
      where: { id },
    })
  }

  return {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
  }
}