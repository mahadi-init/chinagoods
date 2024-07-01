import { z } from "zod";

export const CartItemSchema = z
  .object({
    _id: z.string(),
    name: z.string(),
    price: z.string().min(1, "Price must be more than 0"),
    quantity: z.string().min(1, "Quantity must be at least 1"),
    img: z.string(),
    sku: z.string(),
  })
  .partial();

export const OrderSchema = z
  .object({
    _id: z.string(),
    name: z.string().min(2, "Name is too short"),
    phone: z.string().min(11, "Phone number must be 11 characters"),
    address: z.string().min(2, "Address is too short"),
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
    confirm: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .partial();

export type OrderType = z.infer<typeof OrderSchema>;

