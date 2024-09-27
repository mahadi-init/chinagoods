"use client";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import ConfirmationDialog from "./ConfirmationDialog";
import { useTransition } from "react";
import deleteAction from "@/actions/delete-action";
import { ReloadIcon } from "@radix-ui/react-icons";

interface PropTypes {
  queryUrl: string;
  validationTag: string;
}

export default function DeleteItem(props: PropTypes): JSX.Element {
  const [isMutating, startTransition] = useTransition();

  const handleFormAction = async () => {
    startTransition(async () => {
      const res = await deleteAction(props.queryUrl, [props.validationTag]);

      if (res) {
        toast.success("Successfully deleted");
      } else {
        toast.error("Delete failed");
      }
    });
  };

  return (
    <ConfirmationDialog
      alertText="The action will perform a delete operation"
      action={handleFormAction}
    >
      <Button
        type="button"
        size="icon"
        className="h-6 w-6"
        variant="destructive"
        disabled={isMutating}
      >
        {isMutating ? (
          <ReloadIcon className="w-4 animate-spin" />
        ) : (
          <Trash2 size={16} />
        )}
      </Button>
    </ConfirmationDialog>
  );
}
