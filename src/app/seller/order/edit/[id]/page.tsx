import { Request } from "@/https/request";
import EditOrderClient from "./edit-order";
import { TAGS } from "@/types/tags";

export default async function EditOrder({
  params,
}: {
  params: { id: string };
}) {
  const data = await new Request().get(`/order/get/${params.id}`, [
    TAGS.ORDERS,
  ]);
  return <EditOrderClient id={params.id} data={data} />;
}

