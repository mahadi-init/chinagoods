"use client";
import SubmitButton from "@/components/native/SubmitButton";
import { Input } from "@/components/ui/input";
import addRequest from "@/https/add-request";
import { AdminSchema, AdminType } from "@/types/admin.t";
import { sellerType } from "@/types/seller.t";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminType>({
    resolver: zodResolver(AdminSchema),
  });

  const { trigger, isMutating } = useSWRMutation(`/auth/login`, addRequest);

  const onSubmit = async (data: AdminType) => {
    const res: {
      success: boolean;
      data: AdminType | sellerType;
      token: string | undefined;
      message: string | undefined;
      role: "ADMIN" | "SELLER";
    } = await trigger(data);

    if (res.success === true) {
      setCookie("auth", res.token, {
        sameSite: "none",
        secure: true,
      });

      localStorage.setItem("authId", res?.data?._id as string);
      localStorage.setItem("authName", res?.data?.name as string);

      toast.success(`Successfully Logged in as ${res.data.name}`);

      if (res.role === "ADMIN") {
        router.replace("/dashboard");
        return;
      }

      if (res.role === "SELLER") {
        router.replace("/seller");
        return;
      }

      return;
    }

    toast.error(res.message);
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
        </form>
      </div>
    </div>
  );
}
