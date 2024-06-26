import { Button } from "../ui/button";
import ConfirmationDialog from "./ConfirmationDialog";
import useSWRMutation from "swr/mutation";
import updateRequest from "@/https/update-request";
import useStatus from "@/hooks/useStatus";

export default function ChangeConfirmationStatus({
  id,
  confirm,
}: {
  id?: string;
  confirm?: boolean;
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
        const res = await trigger({ confirm: !confirm });
        showStatus("/order", "Successfully updated", res);
      }}
    >
      <Button variant={"outline"} className="font-bold">
        {confirm && !isMutating ? (
          <p className="text-green-600">OK</p>
        ) : (
          <p className="text-red-600">NO</p>
        )}

        {isMutating && "Loading.."}
      </Button>
    </ConfirmationDialog>
  );
}
