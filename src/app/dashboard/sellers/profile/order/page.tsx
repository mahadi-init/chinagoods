import { Request } from "@/https/request";
import MakeOrder from "./make-order";
import { TAGS } from "@/types/tags";

export default async function Order({
  searchParams,
}: {
  searchParams: { id: string; name: string };
}) {
  const products = await new Request().get("/product/all", [TAGS.PRODUCTS]);

  return (
    <MakeOrder
      products={products}
      id={searchParams.id}
      name={searchParams.name}
    />
  );
}
