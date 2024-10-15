"use client";

import PageTop from "@/components/native/PageTop";
import SubmitButton from "@/components/native/SubmitButton";
import { Input } from "@/components/ui/input";
import { OrderSchema, OrderType } from "@/types/order.t";
import { getLastSixDigit } from "@/utils/get-last-six-digit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import updateAction from "@/actions/update-action";
import { TAGS } from "@/types/tags";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

export default function EditOrderClient({
  id,
  data,
}: {
  id: string;
  data: OrderType;
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<OrderType>({
    resolver: zodResolver(OrderSchema),
  });
  const [isMutating, startTransition] = useTransition();
  const router = useRouter();

  const handleUpdate: SubmitHandler<OrderType> = async (data) => {
    startTransition(async () => {
      const res = await updateAction(`/order/edit/${id}`, data, [TAGS.ORDERS]);

      if (res) {
        toast.success("Order successfully edited");
        router.replace("/seller/profile");
      } else {
        toast.error("Order edit failed");
      }
    });
  };

  return (
    <div>
      <PageTop title="Edit Order" />

      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="mt-8 grid grid-cols-1 gap-8 px-4"
      >
        <div className="flex gap-12">
          <div className="w-full">
            <label className="mb-1 block text-sm font-medium" htmlFor="name">
              Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              id="name"
              placeholder="Enter name"
              defaultValue={data?.name}
              {...register("name")}
            />
            {errors.name && (
              <span className="text-xs text-red-700">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="w-full">
            <label className="mb-1 block text-sm font-medium" htmlFor="phone">
              Phone <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              id="phone"
              placeholder="Enter phone"
              defaultValue={data?.phone}
              {...register("phone")}
            />
            {errors.phone && (
              <span className="text-xs text-red-700">
                {errors.phone.message}
              </span>
            )}
          </div>{" "}
        </div>

        <div className="flex gap-12">
          <div className="w-full">
            <label className="mb-1 block text-sm font-medium" htmlFor="address">
              Address <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="address"
              rows={8}
              placeholder="Enter address"
              defaultValue={data?.address}
              {...register("address")}
            />
            {errors.address && (
              <span className="text-xs text-red-700">
                {errors.address.message}
              </span>
            )}
          </div>
          <div className="w-full">
            <label className="mb-1 block text-sm font-medium" htmlFor="note">
              Note
            </label>
            <Textarea
              id="note"
              placeholder="Enter note"
              defaultValue={data?.note}
              {...register("note")}
            />
            {errors.note && (
              <span className="text-xs text-red-700">
                {errors.note.message}
              </span>
            )}
          </div>
        </div>

        <SubmitButton
          text="Update"
          isMutating={isMutating}
          style="w-[180px] mt-4"
        />
      </form>
    </div>
  );
}
