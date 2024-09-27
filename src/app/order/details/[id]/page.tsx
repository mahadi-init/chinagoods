// "use client";

import { OrderSummary } from "@/components/order-summary";
import { Request } from "@/https/request";
import { TAGS } from "@/types/tags";

export default async function OrderDetails({
  params,
}: {
  params: { id: string };
}) {
  const order = await new Request().get(`/order/get/${params.id}`, [
    TAGS.ORDERS,
  ]);

  return (
    <div>
      <OrderSummary order={order} />
    </div>
  );
}
