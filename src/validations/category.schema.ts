import { z } from "zod"

export const createCategorySchema = z.object({
  name: z.string(),
  productsId: z.array(z.string()).optional().default([])
})

export const updateCategorySchema = z.object({
  name: z.string().optional(),
  productsId: z.array(z.string()).optional()
})