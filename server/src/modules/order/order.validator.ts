import z from "zod"

import { IOrderCreateData } from "./order.interface"

const orderStatusSchema = z.enum(["pending", "completed", "cancelled"])

const createOrderBodySchema = z.object({
  userName: z.string().min(1, "userName is required"),
  productSlug: z.string().min(1, "productSlug is required").optional(),
  productId: z.string().min(1, "productId is required").optional(),
  quantity: z
    .coerce.number()
    .int("quantity must be an integer")
    .positive("quantity must be greater than 0"),
  totalPrice: z
    .coerce.number()
    .positive("totalPrice must be greater than 0"),
  orderDate: z
    .coerce.date()
    .refine((value) => !Number.isNaN(value.getTime()), {
      message: "orderDate must be a valid ISO date",
    }),
  status: orderStatusSchema.default("pending"),
}).refine((data) => Boolean(data.productSlug || data.productId), {
  message: "productSlug or productId is required",
  path: ["productSlug"],
})

export type CreateOrderBody = z.infer<typeof createOrderBodySchema>

export const validateCreateOrderBody = (
  payload: unknown,
): IOrderCreateData => createOrderBodySchema.parse(payload)
