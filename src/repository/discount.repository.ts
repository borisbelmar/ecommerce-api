import type { Discount } from '@prisma/client'
import prismaClient from '@/lib/prismaClient'

interface DiscountRepository {
  getAllDiscounts(): Promise<Discount[]>
  getDiscountByCode(code: string): Promise<Discount | null>
  getDiscountById(id: string): Promise<Discount | null>
  createDiscount(discount: Omit<Discount, 'id' | 'createdAt' | 'updatedAt'>): Promise<Discount>
  createDiscountsInBulk(discounts: Omit<Discount, 'id' | 'createdAt' | 'updatedAt'>[]): Promise<number>
  updateDiscount(id: string, discount: Partial<Discount>): Promise<Discount>
  deleteDiscount(id: string): Promise<Discount>
}

export default function getDiscountRepository(): DiscountRepository {
  const getAllDiscounts = async () => {
    return await prismaClient.discount.findMany()
  }

  const getDiscountByCode = async (code: string) => {
    return await prismaClient.discount.findUnique({
      where: { code },
    })
  }

  const getDiscountById = async (id: string) => {
    return await prismaClient.discount.findUnique({
      where: { id },
    })
  }

  const createDiscount = async (discount: Omit<Discount, 'id' | 'createdAt' | 'updatedAt'>) => {
    return await prismaClient.discount.create({
      data: discount,
    })
  }

  const createDiscountsInBulk = async (discounts: Omit<Discount, 'id' | 'createdAt' | 'updatedAt'>[]) => {
    const result =  await prismaClient.discount.createMany({
      data: discounts
    })
    return result.count
  }

  const updateDiscount = async (id: string, discount: Partial<Discount>) => {
    return await prismaClient.discount.update({
      where: { id },
      data: discount,
    })
  }

  const deleteDiscount = async (id: string) => {
    return await prismaClient.discount.delete({
      where: { id },
    })
  }

  return {
    getAllDiscounts,
    getDiscountByCode,
    getDiscountById,
    createDiscount,
    createDiscountsInBulk,
    updateDiscount,
    deleteDiscount
  }
}