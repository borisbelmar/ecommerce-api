import getProductRepository from "@/repository/product.repository"
import { z } from "zod"
import { createProductSchema, updateProductSchema } from "@/validations/product.schema"
import { ControllerError } from "@/errors/ControllerError"

export const getAllProducts = async () => {
  const repository = getProductRepository()

  const products = await repository.getAllProducts()

  return products
}

export const getAllProductsByCategory = async (categoryId: string) => {
  const repository = getProductRepository()

  const products = await repository.getAllProductsByCategory(categoryId)

  return products
}

export const getProductById = async (id: string) => {
  const repository = getProductRepository()

  const product = await repository.getProductById(id)

  return product
}

type CreateProductDTO = z.infer<typeof createProductSchema>

export const createProduct = async (data: CreateProductDTO) => {
  const repository = getProductRepository()

  try {
    const validatedProduct = createProductSchema.parse(data)

    const product = await repository.createProduct(validatedProduct)

    return product
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ControllerError(400, error.message)
    }
    throw error
  }
}

type UpdateProductDTO = z.infer<typeof updateProductSchema>

export const updateProduct = async (id: string, data: UpdateProductDTO) => {
  const repository = getProductRepository()

  try {
    const validatedProduct = updateProductSchema.parse(data)

    const product = await repository.updateProduct(id, validatedProduct)

    return product
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ControllerError(400, error.message)
    }
    throw error
  }
}

export const deleteProduct = async (id: string) => {
  const repository = getProductRepository()

  return repository.deleteProduct(id)
}