import getCategoryRepository from "@/repository/category.repository"
import { z } from "zod"
import { createCategorySchema, updateCategorySchema } from "@/validations/category.schema"
import { ControllerError } from "@/errors/ControllerError"

export const getAllCategories = async () => {
  const repository = getCategoryRepository()
  const categories = await repository.getAllCategories()
  return categories
}

export const getCategoryById = async (id: string) => {
  const repository = getCategoryRepository()

  const category = await repository.getCategoryById(id)

  return category
}

type CreateCategoryDTO = z.infer<typeof createCategorySchema>

export const createCategory = async (data: CreateCategoryDTO) => {
  const repository = getCategoryRepository()

  try {
    const validatedCategory = createCategorySchema.parse(data)

    const category = await repository.createCategory(validatedCategory)

    return category
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ControllerError(400, error.message)
    }
    throw error
  }
}

type UpdateCategoryDTO = z.infer<typeof updateCategorySchema>

export const updateCategory = async (id: string, data: UpdateCategoryDTO) => {
  const repository = getCategoryRepository()

  try {
    const validatedCategory = updateCategorySchema.parse(data)

    const category = await repository.updateCategory(id, validatedCategory)

    return category
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ControllerError(400, error.message)
    }
    throw error
  }
}

export const deleteCategory = async (id: string) => {
  const repository = getCategoryRepository()

  return repository.deleteCategory(id)
}
