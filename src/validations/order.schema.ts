import { z } from "zod";

const orderItemSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
  price: z.number(),
  name: z.string(),
  image: z.string(),
  discount: z.number().nullable(),
  sku: z.string()
})

export const createOrderSchema = z.object({
  userId: z.string().nullable(),
  total: z.number(),
  status: z.enum(["PENDING", "COMPLETED", "CANCELLED"]),
  discountCode: z.string().nullable(),
  paymentStatus: z.enum(["PENDING", "COMPLETED", "CANCELLED"]),
  items: z.array(orderItemSchema).min(1)
})
