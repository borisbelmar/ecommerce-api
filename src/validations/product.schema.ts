import { z } from 'zod'

export const createProductSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  image:z.string(),
  tags: z.array(z.string()),
  sku: z.string(),
  categoryId: z.string().nullable()
})

export const updateProductSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  stock: z.number().optional(),
  image: z.string().optional(),
  tags: z.array(z.string()).optional(),
  sku: z.string().optional(),
  categoryId: z.string().nullable()
})