import ResetButton from "./ResetButton";
import SubmitButton from "./SubmitButton";

export default function ButtonGroup({ isMutating }: { isMutating?: boolean }) {
  return (
    <div className="flex gap-8">
      <ResetButton />
      <SubmitButton isMutating={isMutating} style="w-fit" />
    </div>
  );
}
