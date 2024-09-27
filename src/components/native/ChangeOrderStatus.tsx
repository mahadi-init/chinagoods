"use client";
import { Button } from "../ui/button";
import ConfirmationDialog from "./ConfirmationDialog";
import { useTransition } from "react";
import { toast } from "sonner";
import updateAction from "@/actions/update-action";
import { TAGS } from "@/types/tags";

export default function ChangeOrderStatus({
  id,
  status,
  color,
}: {
  id?: string;
  status?: string;
  color?: string;
}) {
  const [isMutating, startTransition] = useTransition();

  return (
    <ConfirmationDialog
      alertText="This action will change order status"
      action={async () => {
        let updateValue: string;

        switch (status) {
          case "WAITING":
            updateValue = "PENDING";
            break;
          case "PENDING":
            updateValue = "WAITING";
            break;
          default:
            updateValue = status as string;
        }

        startTransition(async () => {
          const res = await updateAction(
            `/order/change-order-status/${id}`,
            { status: updateValue },
            [TAGS.ORDERS],
          );

          if (res) {
            toast.success("Operation success");
          } else {
            toast.error("Operation failed");
          }
        });
      }}
    >
      <Button variant={"outline"} className="font-bold">
        {isMutating ? "Loading.." : <p className={color}>{status}</p>}
      </Button>
    </ConfirmationDialog>
  );
}
