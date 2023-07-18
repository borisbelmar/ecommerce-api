import { Product } from "@prisma/client"
import prismaClient from "@/lib/prismaClient"

interface ProductRepository {
  getAllProducts(): Promise<Product[]>
  getAllProductsByCategory(categoryId: string): Promise<Product[]>
  getProductById(id: string): Promise<Product | null>
  createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product>
  updateProduct(id: string, product: Partial<Product>): Promise<Product>
  deleteProduct(id: string): Promise<Product>
}

export default function getProductRepository(): ProductRepository {
  const getAllProducts = async () => {
    return await prismaClient.product.findMany()
  }

  const getProductById = async (id: string) => {
    return await prismaClient.product.findUnique({
      where: { id },
    })
  }

  const createProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    return await prismaClient.product.create({
      data: product,
    })
  }

  const updateProduct = async (id: string, product: Partial<Product>) => {
    return await prismaClient.product.update({
      where: { id },
      data: product,
    })
  }

  const deleteProduct = async (id: string) => {
    return await prismaClient.product.delete({
      where: { id },
    })
  }

  const getAllProductsByCategory = async (categoryId: string) => {
    return await prismaClient.product.findMany({
      where: {
        categoriesId: {
          has: categoryId
        }
      }
    })
  }

  return {
    getAllProducts,
    getProductById,
    getAllProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct
  }
}