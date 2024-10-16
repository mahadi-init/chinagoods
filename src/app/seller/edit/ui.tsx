"use client";
import updateAction from "@/actions/update-action";
import SubmitButton from "@/components/native/SubmitButton";
import { Input } from "@/components/ui/input";
import { TAGS } from "@/types/tags";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const SellerSchema = z.object({
  phone: z.string().optional(),
  password: z.string().optional(),
  fbpage: z.string().optional(),
  fbpageName: z.string().optional(),
});

type SellerType = z.infer<typeof SellerSchema>;

export default function SellerEdit({ id }: { id?: string }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SellerType>({
    resolver: zodResolver(SellerSchema),
  });
  const [isMutating, startTransition] = useTransition();

  const onSubmit: SubmitHandler<SellerType> = async (data) => {
    startTransition(async () => {
      const res = await updateAction(`/seller/edit/${id}`, data, [
        TAGS.DASHBOARD,
      ]);

      if (res) {
        toast.success("Update successful");
      } else {
        toast.error("Update failed");
      }
    });
  };

  return (
    <div className="flex h-[80vh] w-[95vw] flex-col items-center justify-center p-2">
      <p className="text-2xl font-semibold text-gray-900 underline">
        Edit Your Info
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 flex w-full max-w-md flex-col gap-6"
      >
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="phone">
            Phone
          </label>
          <Input
            type="text"
            id="phone"
            placeholder="Enter phone"
            {...register("phone")}
          />
          {errors.phone && (
            <span className="text-xs text-red-700">{errors.phone.message}</span>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="password">
            Password
          </label>
          <Input
            type="text"
            id="password"
            placeholder="Enter password"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-xs text-red-700">
              {errors.password.message}
            </span>
          )}
        </div>

        <div>
          <label
            className="mb-1 block text-sm font-medium"
            htmlFor="fbpageName"
          >
            Facebook Page Name
          </label>
          <Input
            type="text"
            id="fbpageName"
            placeholder="Enter facebook page name"
            {...register("fbpageName")}
          />
          {errors.fbpageName && (
            <span className="text-xs text-red-700">
              {errors.fbpageName.message}
            </span>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="fbpage">
            Facebook Page Link
          </label>
          <Input
            type="text"
            id="fbpage"
            placeholder="Enter facebook page"
            {...register("fbpage")}
          />
          {errors.fbpage && (
            <span className="text-xs text-red-700">
              {errors.fbpage.message}
            </span>
          )}
        </div>

        <SubmitButton isMutating={isMutating} />
      </form>
    </div>
  );
}