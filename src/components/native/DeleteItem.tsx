"use client";
import deleteRequest from "@/https/delete-request";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { Button } from "../ui/button";
import ConfirmationDialog from "./ConfirmationDialog";

interface PropTypes {
  queryUrl: string;
  validationTag: string;
  successMessage: string;
}

export default function DeleteItem(props: PropTypes): JSX.Element {
  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useSWRMutation(props.queryUrl, deleteRequest);

  const handleFormAction = async () => {
    if (isMutating) {
      toast.loading("Deleting...");
    }

    const res = await trigger();

    if (res.success === true) {
      mutate(
        (key) => typeof key === "string" && key.startsWith(props.validationTag),
        undefined,
        { revalidate: true },
      );

      toast.success(props.successMessage);
    } else {
      toast.error(res?.message);
    }
  };

  return (
    <ConfirmationDialog
      alertText="The action will perform a delete operation"
      action={handleFormAction}
    >
      <Button
        type="button"
        size="icon"
        className="w-6 h-6"
        variant="destructive"
      >
        <Trash2 size={16} />
      </Button>
    </ConfirmationDialog>
  );
}
