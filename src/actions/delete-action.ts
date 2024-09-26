"use server";

import { Request } from "@/https/request";
import { revalidateTag } from "next/cache";

export default async function deleteAction(url: string, tag: string) {
  const res = await new Request().del(url);
  revalidateTag(tag);
  return res;
}
