"use client";

import PageTop from "@/components/native/PageTop";
import SubmitButton from "@/components/native/SubmitButton";
import { Input } from "@/components/ui/input";
import useStatus from "@/hooks/useStatus";
import addRequest from "@/https/add-request";
import { fetcher } from "@/https/get-request";
import updateRequest from "@/https/update-request";
import { OrderSchema, OrderType } from "@/types/order.t";
import { getLastSixDigit } from "@/utils/get-last-six-digit";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export default function EditOrder({ params }: { params: { id: string } }) {
  const { data } = useSWR<OrderType>(`/order/get/${params.id}`, fetcher);
  const { showStatus } = useStatus();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<OrderType>({
    resolver: zodResolver(OrderSchema),
  });

  const { trigger, isMutating } = useSWRMutation(
    `/order/edit/${params.id}`,
    updateRequest,
  );

  const handleUpdate: SubmitHandler<OrderType> = async (data) => {
    const res = await trigger(data);
    showStatus("/order", "Order updated successfully", res);
  };

  return (
    <div>
      <PageTop title="Edit Order" />

      <div className="mt-8">
        <p>Invoice: #{getLastSixDigit(data?._id)}</p>
        <p>Seller Name : {data?.sellerName}</p>
      </div>

      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="mt-8 grid grid-cols-1 gap-4"
      >
        <div>
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
            <span className="text-xs text-red-700">{errors.name.message}</span>
          )}
        </div>

        <div>
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
            <span className="text-xs text-red-700">{errors.phone.message}</span>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="address">
            Address <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            id="address"
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

        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="note">
            Note <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            id="note"
            placeholder="Enter note"
            defaultValue={data?.note}
            {...register("note")}
          />
          {errors.note && (
            <span className="text-xs text-red-700">{errors.note.message}</span>
          )}
        </div>

        {/* <div className="flex flex-col gap-2">
          <label className="mb-1 block text-sm font-medium" htmlFor="name">
            Status Update ({data?.status}){" "}
            <span className="text-red-500">*</span>
          </label>
          <select
            className="mt-0.5 rounded-md bg-gray-100 p-2"
            {...register("status")}
            defaultValue={data?.status}
          >
            <option className="text-sky-600" value="PENDING">
              PENDING
            </option>
            <option className="text-yellow-600" value="WAITING">
              WAITING
            </option>
            <option className="text-red-600" value="DELIVERED">
              DELIVERED
            </option>
            <option className="text-green-600" value="CANCELLED">
              CANCELLED
            </option>
          </select>
        </div> */}

        <SubmitButton text="Update" isMutating={isMutating} />
      </form>
    </div>
  );
}
