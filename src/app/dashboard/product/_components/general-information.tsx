"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProductSchema, ProductType } from "@/types/product.t";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

const generalInformation = ProductSchema.pick({
  name: true,
  description: true,
  price: true,
  sellerPrice: true,
  quantity: true,
  discount: true,
  sku: true,
  videoId: true,
  unit: true,
});
type GeneralInformationType = z.infer<typeof generalInformation>;

export default function GeneralInformation({
  children,
  data,
}: {
  children: React.ReactNode;
  data?: GeneralInformationType;
}) {
  const { register } = useFormContext<ProductType>();

  return (
    <div className="rounded-lg bg-gray-100 p-6 shadow">
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">General</h2>
        {children}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="title">
              Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              id="title"
              defaultValue={data?.name}
              placeholder="Product Title"
              {...register("name", { required: true })}
            />
          </div>

          <div>
            <label
              className="mb-1 block text-sm font-medium"
              htmlFor="description"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="description"
              defaultValue={data?.description}
              placeholder="Your Description"
              {...register("description", { required: true })}
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="price">
              Price <span className="text-red-500">*</span>
            </label>
            <Input
              type="number"
              id="price"
              defaultValue={data?.price}
              placeholder="Product price"
              {...register("price", { required: true })}
            />
            <p className="mt-1 text-xs text-gray-500">
              Set the base price of product.
            </p>
          </div>

          <div>
            <label
              className="mb-1 block text-sm font-medium"
              htmlFor="quantity"
            >
              Quantity <span className="text-red-500">*</span>
            </label>
            <Input
              type="number"
              id="quantity"
              defaultValue={data?.quantity}
              placeholder="Quantity"
              {...register("quantity", { required: true })}
            />
            <p className="mt-1 text-xs text-gray-500">
              Enter the product quantity.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="sku">
            SKU
          </label>
          <Input
            type="text"
            id="sku"
            defaultValue={data?.sku}
            placeholder="SKU"
            {...register("sku", { required: false })}
          />
          <p className="mt-1 text-xs text-gray-500">Enter the product SKU.</p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="video-id">
            Youtube Video Id
          </label>
          <Input
            type="url"
            id="video-id"
            defaultValue={data?.videoId}
            placeholder="video id"
            {...register("videoId", { required: false })}
          />
          <p className="mt-1 text-xs text-gray-500">
            Set the video id of product.
          </p>
        </div>
      </div>
    </div>
  );
}
