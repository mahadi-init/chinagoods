import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { fetcher } from "@/https/get-request";
import { OrderType } from "@/types/order.t";
import useSWR from "swr";
import { OrderSummary } from "../order-summary";

export function OrderDialog({ order }: { order: OrderType }) {
  const { data } = useSWR<OrderType>(`/order/get/${order._id}`, fetcher);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{order.name}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <OrderSummary order={data} />
      </DialogContent>
    </Dialog>
  );
}
