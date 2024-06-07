import { z } from "zod";
import { ProductStatusSchema } from "./product-status.t";

export const ProductSchema = z
  .object({
    _id: z.string(),
    cid: z.coerce.number(),
    name: z.string().min(3, "Name is too short"),
    img: z.string().url(),
    sku: z.string().min(3, "SKU is too short"),
    slug: z.string(),
    price: z.number().min(0),
    quantity: z.number().min(0),
    description: z.string(),
    videoId: z.string(),
    status: ProductStatusSchema,
    reviews: z.array(z.string()),
    review: z.number(),
    additionalInformation: z.array(
      z.object({ key: z.string(), value: z.string() })
    ),
    sellCount: z.number().min(0),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
  .partial();

export type ProductType = z.infer<typeof ProductSchema>;
