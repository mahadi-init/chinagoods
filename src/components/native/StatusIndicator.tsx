import { Badge } from "../ui/badge";
import { useTransition } from "react";
import { toast } from "sonner";
import updateAction from "@/actions/update-action";

export default function StatusIndicator({
  status,
  updateStatusUrl,
  mutationTag,
  variant,
  text,
}: {
  status?: boolean;
  updateStatusUrl: string;
  mutationTag: string;
  variant?: "default" | "destructive" | "outline" | "secondary";
  text?: string;
}): JSX.Element {
  const [isMutating, startTransition] = useTransition();

  const handleOnClick = async () => {
    startTransition(async () => {
      const res = await updateAction(updateStatusUrl, { status: !status }, [
        mutationTag,
      ]);

      if (res) {
        toast.success("Update successful");
      } else {
        toast.error("Update failed");
      }
    });
  };

  return (
    <Badge
      variant={!variant ? (status ? "default" : "destructive") : "outline"}
      className="cursor-pointer text-xs font-semibold"
      onClick={handleOnClick}
    >
      {!isMutating && !text ? (status ? "ACTIVE" : "INACTIVE") : text}
      {isMutating && "UPDATING.."}
    </Badge>
  );
}
