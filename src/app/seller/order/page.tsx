import { Request } from "@/https/request";
import MakeOrder from "./make-order";
import { TAGS } from "@/types/tags";
import { cookies } from "next/headers";

export default async function Order() {
  const auth = cookies().get("authId")?.value;
  const authName = cookies().get("authName")?.value;

  const products = await new Request().get("/product/all", [TAGS.PRODUCTS]);

  return <MakeOrder products={products} auth={auth} authName={authName} />;
}
