import { Request } from "@/https/request";
import EditSellerPayment from "./ui";
import { TAGS } from "@/types/tags";

export default async function SellerEditPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await new Request().get(`/seller/details/${params.id}`, [
    TAGS.SELLERS,
  ]);

  return <EditSellerPayment data={data} id={params.id} />;
}
