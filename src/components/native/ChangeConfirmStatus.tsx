import { Button } from "../ui/button";
import ConfirmationDialog from "./ConfirmationDialog";
import useSWRMutation from "swr/mutation";
import updateRequest from "@/https/update-request";
import useStatus from "@/hooks/useStatus";
import clsx from "clsx";

export default function ChangeConfirmationStatus({
  id,
  confirm,
}: {
  id?: string;
  confirm?: string;
}) {
  const { trigger, isMutating } = useSWRMutation(
    `/order/change-confirm-status/${id}`,
    updateRequest,
  );
  const { showStatus } = useStatus();

  return (
    <ConfirmationDialog
      alertText="This action will change confirm status"
      action={async () => {
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

        const res = await trigger({ confirm: updateValue });
        showStatus("/order", "Successfully updated", res);
      }}
    >
      <Button variant={"outline"} className="font-bold">
        {isMutating ? (
          "Loading.."
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
    </ConfirmationDialog>
  );
}
