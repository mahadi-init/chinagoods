import { z } from "zod";
import { ProductSchema } from "./product.t";

export const SellerOrderSchema = z.object({
  name: z.string(),
  address: z.string(),
  phone: z.coerce.number().min(11, "Phone number must be 11 characters"),
  products: z.array(z.object({
    product: ProductSchema,
    quantity: z.coerce.number().min(1)
  }))
}).partial()

export type SellerOrderType = z.infer<typeof SellerOrderSchema>;