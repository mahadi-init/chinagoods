import { Request } from "@/https/request";
import InvoiceUI from "./ui";
import { TAGS } from "@/types/tags";

export default async function Invoice({ params }: { params: { id: string } }) {
  const data = await new Request().get(`/order/get/${params.id}`, [
    TAGS.ORDERS,
  ]);
  return <InvoiceUI order={data} />;
}
