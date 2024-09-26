"use server";

import { Request } from "@/https/request";
import { TAGS } from "@/types/tags";
import { revalidateTag } from "next/cache";

export const sendOrder = async (data: unknown) => {
  const res = await new Request().post("/order/add", data);
  revalidateTag(TAGS.ORDERS);
  revalidateTag(TAGS.DASHBOARD);
  return res;
};
