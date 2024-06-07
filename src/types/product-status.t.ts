import { z } from "zod";

export const ProductStatusSchema = z.enum([
  "IN-STOCK",
  "OUT-OF-STOCK",
  "DISCONTINUED",
]);
export type ProductStatusType = z.infer<typeof ProductStatusSchema>;
