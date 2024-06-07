"use client";
import ButtonGroup from "@/components/native/ButtonGroup";
import { ImageUploader } from "@/components/native/ImageUploader";
import { Input } from "@/components/ui/input";
import useStatus from "@/hooks/useStatus";
import { BrandSchema, BrandType } from "@/types/brand.t";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface PropTypes extends BrandType {
  trigger: (arg: unknown) => Promise<{ success: boolean; message?: string }>;
  isMutating: boolean;
  successMessage: string;
}

export default function BrandUI(props: PropTypes) {
  const [imgUrl, setImgUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showStatus } = useStatus();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BrandType>({
    resolver: zodResolver(BrandSchema),
  });

  // reset & set form
  useEffect(() => {
    reset(props);
    setImgUrl(props.img);
  }, [reset, props]);

  const onSubmit: SubmitHandler<BrandType> = async (data) => {
    if (isLoading) {
      toast.error("Please wait for image upload to complete");
      return;
    }

    const refinedData: BrandType = {
      ...data,
      img: imgUrl,
    };

    const res = await props.trigger(refinedData);
    showStatus("/brand", props.successMessage, res);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full xl:w-7/12">
      <ImageUploader
        setIsLoading={setIsLoading}
        imgUrl={imgUrl}
        setImgUrl={setImgUrl}
        endpoint="brand"
      />

      <div className="flex flex-col gap-6">
        <label className="ml-1 font-medium">
          Name <span className="text-red-600">*</span>
          <Input
            type="text"
            placeholder="sony"
            className="mt-1 bg-gray-100"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-xs text-red-700">{errors.name.message}</span>
          )}
        </label>

        <label className="ml-1 font-medium">
          Email
          <Input
            type="email"
            placeholder="sony@gmail.com"
            className="mt-1 bg-gray-100"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-xs text-red-700">{errors.email.message}</span>
          )}
        </label>

        <label className="ml-1 font-medium">
          Location
          <Input
            type="text"
            placeholder="USA"
            className="mt-1 bg-gray-100"
            {...register("location")}
          />
          {errors.location && (
            <span className="text-xs text-red-700">
              {errors.location.message}
            </span>
          )}
        </label>
        <ButtonGroup isMutating={props.isMutating} />
      </div>
    </form>
  );
}