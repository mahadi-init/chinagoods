"use client";
import SubmitButton from "@/components/native/SubmitButton";
import { Input } from "@/components/ui/input";
import { AdminSchema, AdminType } from "@/types/admin.t";
import { SellerType } from "@/types/seller.t";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import signin from "./action";

export default function Login() {
  const [isMutating, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminType>({
    resolver: zodResolver(AdminSchema),
  });

  const onSubmit: SubmitHandler<AdminType | SellerType> = async (data) => {
    startTransition(async () => {
      const res = await signin(data);

      if (!res.success) {
        toast.error("Error signing in");
      } else {
      }
    });
  };

  return (
    <div className="flex h-screen w-screen items-center justify-evenly p-4">
      <div className="w-full max-w-md">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Sign in to your account</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          <label htmlFor="phone" className="ml-1 font-medium">
            Phone Number <span className="text-red-600">*</span>
            <Input
              id="tel"
              type="phone"
              placeholder="Enter Phone"
              className="mt-2.5"
              {...register("phone", { required: true })}
            />
            {errors.phone && (
              <span className="text-xs text-red-700">
                {errors.phone.message}
              </span>
            )}
          </label>

          <div className="space-y-5">
            <label
              htmlFor="password"
              className="text-base font-medium text-gray-900"
            >
              Password <span className="text-red-600">*</span>
              <Input
                id="password"
                type="password"
                placeholder="Enter strong password"
                className="mt-2.5"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-xs text-red-700">
                  {errors.password.message}
                </span>
              )}
            </label>
          </div>

          <SubmitButton isMutating={isMutating} style="w-full" />
          <p className="text-sm">
            New seller{" "}
            <Link className="text-blue-700" href="/auth/signup">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
