import { OrderSummary } from "@/components/order-summary";
import { Request } from "@/https/request";

export default async function OrderDetails({
  params,
}: {
  params: { id: string };
}) {
  const order = await new Request().get(`/order/get/${params.id}`);

  return (
    <div>
      <OrderSummary order={order} />
    </div>
  );
}
