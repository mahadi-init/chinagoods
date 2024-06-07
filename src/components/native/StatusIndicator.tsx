import useStatus from "@/hooks/useStatus";
import updateRequest from "@/https/update-request";
import useSWRMutation from "swr/mutation";
import { Badge } from "../ui/badge";

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
  const { showStatus } = useStatus();
  const { trigger, isMutating } = useSWRMutation(
    updateStatusUrl,
    updateRequest
  );

  const handleOnClick = async () => {
    const res = await trigger({ status: !status });
    showStatus(mutationTag as string, "Status updated successfully", res);
  };

  return (
    <Badge
      variant={!variant ? (status ? "default" : "destructive") : "outline"}
      className="text-xs font-semibold cursor-pointer"
      onClick={handleOnClick}
    >
      {!isMutating && !text ? (status ? "ACTIVE" : "INACTIVE") : text}
      {isMutating && "UPDATING.."}
    </Badge>
  );
}
