"use client";
import updateAction from "@/actions/update-action";
import SubmitButton from "@/components/native/SubmitButton";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SellerSchema, SellerType } from "@/types/seller.t";
import { TAGS } from "@/types/tags";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function EditSellerPayment({
  data,
  id,
}: {
  data: SellerType;
  id?: string;
}) {
  const [date, setDate] = useState<Date | undefined>();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<SellerType>({
    resolver: zodResolver(SellerSchema),
  });
  const [isMutating, startTransition] = useTransition();

  const submitHandler = (data: SellerType) => {
    if (date && date > new Date()) {
      toast.error("Invalid date");
      return;
    }

    startTransition(async () => {
      const res = await updateAction(
        `/seller/payment-info/${id}`,
        {
          ...data,
          lastPaymentDate: date ?? new Date(),
        },
        [TAGS.SELLERS],
      );

      if (res) {
        toast.success("Update successful");
        reset();
      } else {
        toast.error("Failed updating data");
      }
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-center text-2xl font-bold underline">Seller Data</p>
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-green-600">Name : {data.name}</p>
        <p className="font-semibold text-purple-500">Phone : {data.phone}</p>
      </div>

      <form onSubmit={handleSubmit(submitHandler)} className="mt-6">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex flex-col gap-4">
            <div className="w-[350px]">
              <Label>Payment amount</Label>
              <Input
                placeholder={data.lastPaymentAmount ?? "1200"}
                type="number"
                {...register("lastPaymentAmount", { required: true })}
              />
              {errors.lastPaymentAmount && (
                <span className="text-xs text-red-700">
                  {errors.lastPaymentAmount.message}
                </span>
              )}
            </div>
            <div className="w-[350px]">
              <Label>Delivery at that Point</Label>
              <Input
                placeholder={data.monthlyDeliveredAtThatPoint ?? "120"}
                type="number"
                {...register("monthlyDeliveredAtThatPoint")}
              />
              {errors.monthlyDeliveredAtThatPoint && (
                <span className="text-xs text-red-700">
                  {errors.monthlyDeliveredAtThatPoint.message}
                </span>
              )}
            </div>
            <div className="w-full">
              <Label>Payment date</Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </div>
          </div>
          <div className="w-full">
            <Label>Note</Label>
            <Textarea
              rows={20}
              placeholder={data.note ?? "Enter your note here"}
              {...register("note")}
            />
          </div>
        </div>
        <div className="flex w-full justify-end">
          <SubmitButton style="w-1/5" isMutating={isMutating} />
        </div>
      </form>
    </div>
  );
}
