import { Button, buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "./SubmitButton";

export default function BottomDrawer({
  requestType,
  btnVariants = "default",
  bkashNumber,
  onSubmit,
  isMutating,
}: {
  requestType: "Deposit" | "Withdraw";
  btnVariants: "default" | "destructive";
  bkashNumber?: string;
  onSubmit: () => void;
  isMutating?: boolean;
}) {
  return (
    <Drawer>
      <DrawerTrigger className={buttonVariants({ variant: btnVariants })}>
        {requestType}
      </DrawerTrigger>
      <DrawerContent>
        <form action={onSubmit} className="w-full max-w-sm mx-auto">
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>
              You sending a {requestType.toLowerCase()} request
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex flex-col gap-4 p-4 pb-0">
            <Label htmlFor="amount">
              Amount
              <Input
                id="amount"
                name="amount"
                type="number"
                placeholder="3000"
                className="mt-2"
                required
              />
            </Label>

            {/* {requestType === "Deposit" && ( */}
            {/*   <Label htmlFor="ref"> */}
            {/*     Reference */}
            {/*     <Input */}
            {/*       id="ref" */}
            {/*       type="text" */}
            {/*       placeholder="01312345678" */}
            {/*       className="mt-2" */}
            {/*       defaultValue={bkashNumber} */}
            {/*       required */}
            {/*     /> */}
            {/*   </Label> */}
            {/* )} */}

            {requestType === "Withdraw" && (
              <Label htmlFor="message">
                Message
                <Textarea
                  id="amount"
                  name="amount"
                  defaultValue={`Hello sir, i am sending you withdraw request`}
                  rows={3}
                  className="mt-2"
                  disabled
                  required
                />
              </Label>
            )}

            {requestType === "Withdraw" && (
              <Label htmlFor="message">
                Message
                <Textarea
                  id="amount"
                  name="amount"
                  defaultValue={`Hello sir, i am sending you withdraw request`}
                  rows={3}
                  className="mt-2"
                  disabled
                  required
                />
              </Label>
            )}
          </div>

          <DrawerFooter>
            <SubmitButton isMutating={isMutating} text="Submit" />
            <DrawerClose>
              <Button className="w-full" variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
