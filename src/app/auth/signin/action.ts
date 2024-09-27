"use server";

import { Request } from "@/https/request";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function signin(data: unknown) {
  const res = await new Request().post("/auth/login", data);

  if (res.success === true) {
    cookies().set("auth", res.token, {
      sameSite: "none",
      secure: true,
      path: "/",
    });

    cookies().set("authId", res?.data._id);
    cookies().set("authName", res?.data.name);

    if (res.role === "ADMIN") {
      redirect("/dashboard");
    }

    if (res.role === "SELLER") {
      redirect("/seller");
    }
  }

  return res;
}
