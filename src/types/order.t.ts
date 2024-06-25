import { z } from "zod";

export const CartItemSchema = z.object({
  _id: z.string(),
  name: z.string(),
  price: z.string(),
  quantity: z.string(),
  img: z.string(),
  sku: z.string()
}).partial()

export const OrderSchema = z.object({
  _id: z.string(),
  name: z.string(),
  phone: z.string(),
  address: z.string(),
  cart: z.array(CartItemSchema),
  shippingCost: z.number(),
  subTotal: z.number(),
  total: z.number(),
  note: z.string(),
  trackingLink: z.string(),
  consignmentId: z.string(),
  sellerName: z.string(),
  sellerId: z.string(),
  status: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
}).partial()

export type OrderType = z.infer<typeof OrderSchema>