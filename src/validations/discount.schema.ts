import { z } from 'zod'

export const createDiscountSchema = z.object({
  code: z.null().optional(),
  type: z.enum(['CATEGORY', 'PRODUCT', 'TAG', 'ALL']),
  ref: z.array(z.string()),
  value: z.number(),
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
  maxUses: z.number().nullish()
})

export const updateDiscountSchema = z.object({
  from: z.coerce.date().nullable().optional(),
  to: z.coerce.date().nullable().optional(),
  maxUses: z.number().nullish()
})


