import { z } from "zod";
import { OrderSchema } from "./order.t";

export const PaymentSchema = z
  .object({
    _id: z.string(),
    lastPaymentDate: z.string().datetime(),
    lastPaymentAmount: z.string().min(1, "can't be empty"),
    monthlyDeliveredAtThatPoint: z.string(),
    note: z.string(),
  })
  .partial();

export const SellerSchema = z
  .object({
    _id: z.string(),
    name: z.string().min(3, "Name is too short"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z.string().min(11, "Phone number must be 11 characters"),
    orders: z.array(OrderSchema),
    payments: z.array(PaymentSchema),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
  .partial();

export type PaymentType = z.infer<typeof PaymentSchema>;
export type SellerType = z.infer<typeof SellerSchema>;
