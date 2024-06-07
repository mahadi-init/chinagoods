import { getAuthCookie } from "@/helpers/get-auth";
import { site } from "@/site-config";

async function deleteRequest(url: string) {
  const auth = await getAuthCookie();

  try {
    const res = await fetch(`${site.BACKEND_URL}${url}`, {
      method: "DELETE",
      // credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
}

export default deleteRequest;
