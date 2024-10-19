import { Request } from "@/https/request";
import EditProduct from "./ui";

export default async function Edit({ params }: { params: { id: string } }) {
  const product = await new Request().get(`/product/get/${params.id}`);

  console.log(product);

  return <EditProduct product={product} />;
}
