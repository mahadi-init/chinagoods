"use client";
import { ImageUploader } from "@/components/native/ImageUploader";
import ButtonGroup from "@/components/native/ButtonGroup";
import { ChipInput } from "@/components/native/ChipInput";
import { Input } from "@/components/ui/input";
import useStatus from "@/hooks/useStatus";
import { fetcher } from "@/https/get-request";
import { CategorySchema, CategoryType } from "@/types/category.t";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useSWR from "swr";
import { toast } from "sonner";

interface PropTypes extends CategoryType {
  trigger: (arg: unknown) => Promise<{ success: boolean; message?: string }>;
  isMutating: boolean;
  successMessage: string;
}

export default function CategoryUI(props: PropTypes) {
  const { data } = useSWR<string[]>(`/extra/all/product-types`, fetcher);
  const [imgUrl, setImgUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const { showStatus } = useStatus();
  const [children, setChildren] = useState<string[]>(props.children ?? []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryType>({
    resolver: zodResolver(CategorySchema),
  });

  // reset & set form
  useEffect(() => {
    reset(props);
    setChildren(props.children ?? []);
  }, [reset, props, data]);

  const onSubmit: SubmitHandler<CategoryType> = async (data) => {
    if (isLoading) {
      toast.error("Please wait for image upload to complete");
      return;
    }

    const refinedData: CategoryType = {
      ...data,
      img: imgUrl,
      children: children,
    };

    const res = await props.trigger(refinedData);
    showStatus("/category", props.successMessage, res);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 w-full xl:w-7/12">
      <ImageUploader
        setIsLoading={setIsLoading}
        setImgUrl={setImgUrl}
        endpoint="category"
      />

      <div className="flex flex-col gap-8 p-4">
        <label className="ml-1 font-medium">
          Name <span className="text-red-600">*</span>
          <Input
            type="text"
            placeholder="Headphones"
            className="mt-1 bg-gray-100"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-xs text-red-700">{errors.name.message}</span>
          )}
        </label>
        <ChipInput label="Children" items={children} setItems={setChildren} />
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="product-type"
          >
            Product Type <span className="text-red-500">*</span>
          </label>
          <select
            id="product-type"
            defaultValue={props.productType}
            className="mt-0.5 w-full p-2.5 bg-gray-100 rounded-md"
            {...register("productType", { required: true })}
          >
            {data?.map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <p className="mt-2 text-sm text-gray-500">Set the product type</p>
        </div>
        <ButtonGroup isMutating={props.isMutating} />
      </div>
    </form>
  );
}
