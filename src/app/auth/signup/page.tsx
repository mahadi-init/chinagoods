"use client";
import SubmitButton from "@/components/native/SubmitButton";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import SignupAction from "./signup-action";
import { useRouter } from "next/navigation";

const ADMINCODE = "624234";

const SellerSchema = z.object({
  name: z.string(),
  phone: z.string().min(11, "minimum 11 characters required"),
  password: z.string().min(6, "minimum 6 characters required"),
  adminCode: z.string().min(6, "minimum 6 characters required"),
});

type SellerType = z.infer<typeof SellerSchema>;

export default function Signup() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SellerType>({
    resolver: zodResolver(SellerSchema),
  });
  const router = useRouter();
  const [isMutating, startTransition] = useTransition();

  const onSubmit: SubmitHandler<SellerType> = async (data) => {
    if (data.adminCode !== ADMINCODE) {
      toast.error("Incorrect admin code !!");
    }

    startTransition(async () => {
      const res = await SignupAction(data);

      if (res) {
        toast.error("Signup successful");
        router.replace("/auth/signin");
      } else {
        toast.error("Signup failed");
        reset();
      }
    });
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center p-4">
      <p className="text-2xl font-semibold text-gray-900">
        Create Seller Account
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 flex w-full max-w-md flex-col gap-6"
      >
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="name">
            Name <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            id="name"
            placeholder="Enter your name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-xs text-red-700">{errors.name.message}</span>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="phone">
            Phone<span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            id="phone"
            placeholder="Enter phone"
            {...register("phone", { required: true })}
          />
          {errors.phone && (
            <span className="text-xs text-red-700">{errors.phone.message}</span>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="password">
            Password <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            id="password"
            placeholder="Enter password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-xs text-red-700">
              {errors.password.message}
            </span>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="code">
            Admin Code <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            id="code"
            placeholder="Enter admin code"
            {...register("adminCode", { required: true })}
          />
          {errors.adminCode && (
            <span className="text-xs text-red-700">
              {errors.adminCode.message}
            </span>
          )}
        </div>

        <SubmitButton isMutating={isMutating} />
      </form>
    </div>
  );
}
