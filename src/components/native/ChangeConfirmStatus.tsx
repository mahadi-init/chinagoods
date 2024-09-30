import updateAction from "@/actions/update-action";
import { Button } from "../ui/button";
import clsx from "clsx";
import { useTransition } from "react";
import { TAGS } from "@/types/tags";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function ChangeConfirmationStatus({
  id,
  confirm,
}: {
  id?: string;
  confirm?: string;
}) {
  const [isMutating, startTransition] = useTransition();

  return (
    <Button
      variant={"outline"}
      className="font-bold"
      onClick={async () => {
        let updateValue: string;

        switch (confirm) {
          case "OK":
            updateValue = "HOLD";
            break;
          case "NO":
            updateValue = "OK";
            break;
          default:
            updateValue = "NO";
        }

        startTransition(async () => {
          const res = await updateAction(
            `/order/change-confirm-status/${id}`,
            {
              confirm: updateValue,
            },
            [TAGS.ORDERS],
          );

          if (res) {
            toast.success("Status updated successfully");
          } else {
            toast.error("Update failed");
          }
        });
      }}
    >
      {isMutating ? (
        <ReloadIcon className="w-4 animate-spin" />
      ) : (
        <p
          className={clsx(
            confirm === "OK"
              ? "text-green-700"
              : confirm === "NO"
                ? "text-red-700"
                : "text-yellow-600",
          )}
        >
          {confirm}
        </p>
      )}
    </Button>
  );
}
