"use client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

interface SubmitButtonProps {
  text: string;
  style: string;
  isMutating: boolean;
  variant: "default" | "destructive" | "ghost" | "link" | "outline";
}

export default function SubmitButton({
  isMutating,
  text,
  style,
  variant = "default",
}: Partial<SubmitButtonProps>): JSX.Element {
  return (
    <Button
      variant={variant}
      type="submit"
      disabled={isMutating}
      className={style}
    >
      {isMutating ? (
        <>
          <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
          <span>Please wait</span>
        </>
      ) : (
        <span>{text ?? "Submit"}</span>
      )}
    </Button>
  );
}
