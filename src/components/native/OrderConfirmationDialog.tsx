import postAction from "@/actions/post-action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { OrderType } from "@/types/order.t";
import { TAGS } from "@/types/tags";
import React, { useEffect, useTransition } from "react";
import { toast } from "sonner";

export default function OrderConfirmationDialog({
  alertText,
  children,
  data,
}: {
  alertText: string;
  children: React.ReactNode;
  data: OrderType;
}): React.ReactElement {
  const [isMutating, startTransition] = useTransition();

  useEffect(() => {
    if (isMutating) {
      toast.loading("Order sending...");
    } else {
      toast.dismiss();
    }
  }, [isMutating]);

  const handleSubmit = async () => {
    startTransition(async () => {
      const res = await postAction("/order/send-order", data, [TAGS.ORDERS]);

      if (res) {
        toast.success("Order send successfully");
      } else {
        toast.error("Order send failed");
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{alertText}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
