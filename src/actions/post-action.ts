"use server";

import { Request } from "@/https/request";
import { revalidateTag } from "next/cache";

export default async function postAction(
  url: string,
  data: unknown,
  tags?: string[],
) {
  const res = await new Request().post(url, data);
  if (tags) {
    tags.map((tag) => {
      revalidateTag(tag);
    });
  }
  return res;
}
