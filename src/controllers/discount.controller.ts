import { nanoid } from "nanoid";
import getDiscountRepository from "@/repository/discount.repository";
import { createDiscountSchema, updateDiscountSchema } from "@/validations/discount.schema";
import { ZodError, z } from "zod";
import { ControllerError } from "@/errors/ControllerError";
import { Discount } from "@prisma/client";

const isObjectId = (id: string) => {
  return id.match(/^[0-9a-fA-F]{24}$/);
}

const generateDiscountCode = () => {
  const code = nanoid(9).toUpperCase()
  return code.slice(0, 3) + '-' + code.slice(3, 6) + '-' + code.slice(6, 9)
}

export const getAllDiscounts = async () => {
  const discountRepository = getDiscountRepository();
  return discountRepository.getAllDiscounts()
}

export const getDiscountByCodeOrId = async (codeOrId: string) => {
  const discountRepository = getDiscountRepository()

  let result = null

  if (isObjectId(codeOrId)) {
    result = await discountRepository.getDiscountById(codeOrId)
  } else {
    result = await discountRepository.getDiscountByCode(codeOrId)
  }

  if (!result) {
    throw new ControllerError(404, 'Discount not found')
  }

  return result
}

type DiscountCreateDTO = z.infer<typeof createDiscountSchema> & { count?: number }

const mapDiscountToEntity = (discount: DiscountCreateDTO): Omit<Discount, 'id' | 'createdAt' | 'updatedAt'> => {
  return {
    ...discount,
    code: discount.code === undefined ? generateDiscountCode() : discount.code,
    maxUses: discount.maxUses || null,
    from: discount.from || null,
    to: discount.to || null
  }
}

export const createDiscount = async (discount: DiscountCreateDTO) => {
  const discountRepository = getDiscountRepository()

  if (discount.count! > 0) {
    try {
      const validatedDiscount = createDiscountSchema.parse(discount)
      const discounts = Array.from({ length: discount.count! }, () => mapDiscountToEntity(validatedDiscount))
      const count = await discountRepository.createDiscountsInBulk(discounts)
      return { count }
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ControllerError(400, 'Invalid payload')
      }
      throw error
    }
  }

  try {
    const validatedDiscount = createDiscountSchema.parse(discount)
    const mapDiscount = mapDiscountToEntity(validatedDiscount)
    return discountRepository.createDiscount(mapDiscount)
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ControllerError(400, 'Invalid payload')
    }
    throw error
  }
}

type DiscountUpdateDTO = z.infer<typeof updateDiscountSchema>

export const updateDiscount = async (id: string, discount: DiscountUpdateDTO) => {
  const discountRepository = getDiscountRepository()

  try {
    const validatedDiscount = updateDiscountSchema.parse(discount)
    return discountRepository.updateDiscount(id, validatedDiscount)
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error)
      throw new ControllerError(400, 'Invalid discount')
    }
    throw error
  }
}

export const deleteDiscount = async (id: string) => {
  const discountRepository = getDiscountRepository()

  return discountRepository.deleteDiscount(id)
}