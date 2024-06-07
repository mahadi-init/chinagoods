import { site } from "@/site-config";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export const getAuthInfo = async () => {
  const auth = cookies().get("auth");
  const token = auth?.value as string;
  const key = new TextEncoder().encode(site.JWT_SECRET);

  const { payload } = await jwtVerify(token, key, {
    algorithms: ["HS256"],
  });

  return payload;
};

export const getAuthId = async () => {
  const payload = await getAuthInfo();
  return payload.id;
};

export const getAuthName = async (): Promise<string | unknown> => {
  const payload = await getAuthInfo();
  return payload.name;
};

export const getAuthRole = async () => {
  const payload = await getAuthInfo();
  return payload.role;
};

export const getAuthStatus = async () => {
  const payload = await getAuthInfo();
  return payload.status;
};
