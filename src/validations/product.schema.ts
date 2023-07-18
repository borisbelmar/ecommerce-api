import { z } from 'zod'

export const createProductSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  images: z.array(z.string()),
  tags: z.array(z.string()),
  sku: z.string(),
  variants: z.array(z.string()).optional().default([]),
  categoriesId: z.array(z.string()).optional().default([])
})

export const updateProductSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  stock: z.number().optional(),
  images: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  sku: z.string().optional(),
  variants: z.array(z.string()).optional(),
  categoriesId: z.array(z.string()).optional()
})