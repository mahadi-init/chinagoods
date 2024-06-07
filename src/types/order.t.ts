import { z } from "zod";
import { OrderStatusSchema } from "./order-status.t";

const CartItemSchema = z.object({
  _id: z.string(),
  name: z.string(),
  price: z.string(),
  quantity: z.string(),
  img: z.string()
}).partial()

const OrderSchema = z.object({
  _id: z.string(),
  invoice: z.number(),
  name: z.string(),
  phone: z.string(),
  address: z.string(),
  cart: z.array(CartItemSchema),
  shippingCost: z.number(),
  subTotal: z.number(),
  total: z.number(),
  note: z.string(),
  trackingLink: z.string(),
  status: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
}).partial()

export type OrderType = z.infer<typeof OrderSchema>