"use server";
import { Request } from "@/https/request";

export default async function SignupAction(data: unknown) {
  const res = await new Request().post("/auth/seller/signup", data);
  return res;
}
