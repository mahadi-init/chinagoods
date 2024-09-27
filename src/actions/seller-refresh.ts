"use server";
import { Request } from "@/https/request";
import { TAGS } from "@/types/tags";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export default async function sellerRefresh() {
  const auth = cookies().get("authId")?.value;
  const res = await new Request().update(
    `/seller/orders/refresh?auth=${auth}`,
    {},
  );
  revalidateTag(TAGS.ORDERS);
  return res;
}
