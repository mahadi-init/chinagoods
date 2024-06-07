"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useStatus from "@/hooks/useStatus";
import addRequest from "@/https/add-request";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { z } from "zod";
import { Label } from "../ui/label";
import SubmitButton from "./SubmitButton";

const emailType = z.object({
  email: z.string().email(),
});
type zEmail = z.infer<typeof emailType>;

function SentResetEmail({
  isAdmin,
  setIsAdmin,
  setIsEmailSent,
}: {
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
  setIsEmailSent: (value: boolean) => void;
}) {
  const { showStatus } = useStatus();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<zEmail>({
    resolver: zodResolver(emailType),
  });

  const { trigger, isMutating } = useSWRMutation(
    `${isAdmin ? "/admin" : "/seller"}/forget-password`,
    addRequest
  );

  const onSubmit: SubmitHandler<zEmail> = async (data) => {
    const res = await trigger({ email: data.email });
    showStatus(
      `${isAdmin ? "/admin" : "/seller"}/forget-password`,
      "Email sent successfully",
      res
    );

    setIsEmailSent(true);
  };

  return (
    <form className="space-y-5 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email" className="text-base font-medium text-gray-900">
          Email
          <Input
            id="email"
            placeholder="xyz@gmail.com"
            className="mt-2.5"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-xs text-red-700">{errors.email.message}</span>
          )}
        </label>
      </div>

      <Label className="flex items-center gap-2">
        <Input type="checkbox" onChange={() => setIsAdmin(!isAdmin)} />
        <p className="text-nowrap -mt-1">Signin as an admin</p>
      </Label>

      <div className="flex justify-end">
        <SubmitButton isMutating={isMutating} />
      </div>
    </form>
  );
}

const resetCodeType = z.object({
  token: z.string().min(21, "Reset code must be at least 15 characters"),
});
type zResetCode = z.infer<typeof resetCodeType>;

function LoginWithToken({ isAdmin }: { isAdmin: boolean }) {
  const { showStatus } = useStatus();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<zResetCode>({
    resolver: zodResolver(resetCodeType),
  });

  const { trigger, isMutating } = useSWRMutation(
    `${isAdmin ? "/admin" : "/seller"}/reset-token-login`,
    addRequest
  );

  const onSubmit: SubmitHandler<zResetCode> = async (data) => {
    const res = await trigger({ token: data.token });
    showStatus(
      `${isAdmin ? "/admin" : "/seller"}/reset-token-login`,
      "Login successful",
      res
    );

    if (res) {
      setCookie("auth", res.token, { sameSite: "none", secure: true });

      if (isAdmin) {
        router.replace("/dashboard");
      } else {
        router.replace("/seller");
      }
    }
  };

  return (
    <form className="space-y-5 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="code" className="text-base font-medium text-gray-900">
          Reset code
          <Input
            id="code"
            placeholder="xyz@gmail.com"
            className="mt-2.5"
            {...register("token", { required: true })}
          />
          {errors.token && (
            <span className="text-xs text-red-700">{errors.token.message}</span>
          )}
        </label>
      </div>

      <div className="flex justify-end">
        <SubmitButton isMutating={isMutating} />
      </div>
    </form>
  );
}

export default function RecoverPassword() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="link" className="text-blue-600">
          Forget password?
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Recover Password</DialogTitle>
          <DialogDescription>
            {!isEmailSent
              ? "By entering the email address you recover the account"
              : "Enter the reset code to login"}
          </DialogDescription>
        </DialogHeader>
        {!isEmailSent ? (
          <SentResetEmail
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin}
            setIsEmailSent={setIsEmailSent}
          />
        ) : (
          <LoginWithToken isAdmin={isAdmin} />
        )}
      </DialogContent>
    </Dialog>
  );
}
