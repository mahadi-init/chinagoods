"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { convertEnglishToBengaliNumber } from "@/utils/convert-bangla-english";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProductType } from "@/types/product.t";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import postAction from "@/actions/post-action";
import { TAGS } from "@/types/tags";
import { toast } from "sonner";
import SubmitButton from "@/components/native/SubmitButton";

const FormSchema = z.object({
  name: z.string().min(1, "আপনার নাম দিন"),
  address: z.string().min(1, "আপনার ঠিকানাদিন"),
  phone: z.string().min(1, "আপনার মোবাইল নাম্বার দিন"),
  note: z.string().optional(),
});

type FormType = z.infer<typeof FormSchema>;

export default function InfoForm({ product }: { product?: ProductType }) {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<FormType>({
    resolver: zodResolver(FormSchema),
  });
  const [isMutating, startTransition] = useTransition();

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    let shippingCost = 120;

    const cart = {
      _id: product?._id,
      name: product?.name,
      price: product?.afterPrice ?? product?.price,
      quantity: 1,
      img: product?.img,
      sku: product?.sku,
    };

    const order = {
      name: data.name,
      phone: data.phone,
      address: data.address,
      cart,
      shippingCost,
      subTotal: product?.afterPrice ?? product?.price,
      total: product?.afterPrice ?? product?.price,
      status: "WAITING",
      sku: product?.sku,
      note: data.note,
      sellerName: "CUSTOMER",
    };

    startTransition(async () => {
      const res = await postAction(`/order/add`, order, [
        TAGS.ORDERS,
        TAGS.DASHBOARD,
      ]);

      if (res) {
        toast.success("Order send successfully");
        reset();
      } else {
        toast.error("Order send failed");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-16">
      <p className="text-center text-lg font-bold">
        আপনার নাম, ঠিকানা ও মোবাইল নম্বরটি লিখে অর্ডার কনফার্ম করুন
      </p>

      <div className="mt-6">
        <p className="mb-6 text-xl font-semibold">Billing Address</p>

        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full flex-col items-start space-y-2">
            <Label>আপনার নাম * * *</Label>
            <Input
              className="bg-gray-50"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-xs text-red-700">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="flex w-full flex-col items-start space-y-2">
            <Label>আপনার নাম * * *</Label>
            <Input
              className="bg-gray-50"
              placeholder="গ্রাম-থানা-জেলা লিখুন-"
              {...register("address", { required: true })}
            />
            {errors.address && (
              <span className="text-xs text-red-700">
                {errors.address.message}
              </span>
            )}
          </div>

          <div className="flex w-full flex-col items-start space-y-2">
            <Label>মোবাইল নাম্বার * * *</Label>
            <Input
              className="bg-gray-50"
              placeholder="0123456789"
              {...register("phone", { required: true })}
            />
            {errors.phone && (
              <span className="text-xs text-red-700">
                {errors.phone.message}
              </span>
            )}
          </div>

          <div className="flex w-full flex-col items-start space-y-2">
            <Label>Order notes (optional)</Label>
            <Textarea
              rows={4}
              className="bg-gray-50"
              placeholder="Notes about your order, e.g. special notes for delivery."
              {...register("note")}
            />
            {errors.note && (
              <span className="text-xs text-red-700">
                {errors.note.message}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6 bg-gray-100 p-6">
        <p>Cash on delivery</p>
        <div className="ml-6 mt-2 rounded-3xl rounded-tl-none bg-gray-200 p-4">
          <p>Pay with cash on delivery</p>
        </div>
      </div>

      <SubmitButton
        text={`অর্ডার কনফার্ম করুন! ${convertEnglishToBengaliNumber(product?.afterPrice ?? product?.price!!)}৳`}
        style="mt-6 w-full rounded-none bg-orange-600"
        isMutating={isMutating}
      />
    </form>
  );
}
