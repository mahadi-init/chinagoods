"use server";

import { Request } from "@/https/request";
import { revalidateTag } from "next/cache";

export default async function deleteAction(url: string, tags: string[]) {
  const res = await new Request().del(url);
  if (tags) {
    tags.map((tag) => {
      revalidateTag(tag);
    });
  }
  return res;
}
