import { getCookie } from "cookies-next";

export const getAuthCookie = async () => {
  const authCookie = getCookie("auth");
  return authCookie
};
