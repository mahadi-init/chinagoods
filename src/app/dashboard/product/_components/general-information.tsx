"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProductSchema, ProductType } from "@/types/product.t";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

const generalInformation = ProductSchema.pick({
  name: true,
  description: true,
  extraDes: true,
  price: true,
  afterPrice: true,
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
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductType>();

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
            {errors.name && (
              <span className="text-xs text-red-700">
                {errors.name.message}
              </span>
            )}
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
            {errors.description && (
              <span className="text-xs text-red-700">
                {errors.description.message}
              </span>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="extra">
              Extra Description
            </label>
            <Textarea
              id="extra"
              defaultValue={data?.extraDes}
              placeholder="Your Extra Description"
              {...register("extraDes")}
            />
            {errors.extraDes && (
              <span className="text-xs text-red-700">
                {errors.extraDes.message}
              </span>
            )}
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
            {errors.price && (
              <span className="text-xs text-red-700">
                {errors.price.message}
              </span>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Set the base price of product.
            </p>
          </div>

          <div>
            <label
              className="mb-1 block text-sm font-medium"
              htmlFor="discount"
            >
              Discount Price
            </label>
            <Input
              type="number"
              id="discount"
              defaultValue={data?.afterPrice}
              placeholder="Discount price"
              {...register("afterPrice")}
            />
            {errors.afterPrice && (
              <span className="text-xs text-red-700">
                {errors.afterPrice.message}
              </span>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Set the base price of product.
            </p>
          </div>

          {/* <div> */}
          {/*   <label */}
          {/*     className="mb-1 block text-sm font-medium" */}
          {/*     htmlFor="quantity" */}
          {/*   > */}
          {/*     Quantity <span className="text-red-500">*</span> */}
          {/*   </label> */}
          {/*   <Input */}
          {/*     type="number" */}
          {/*     id="quantity" */}
          {/*     defaultValue={data?.quantity} */}
          {/*     placeholder="Quantity" */}
          {/*     {...register("quantity", { required: true })} */}
          {/*   /> */}
          {/*   <p className="mt-1 text-xs text-gray-500"> */}
          {/*     Enter the product quantity. */}
          {/*   </p> */}
          {/* </div> */}
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
            {...register("sku", { required: true })}
          />
          {errors.sku && (
            <span className="text-xs text-red-700">{errors.sku.message}</span>
          )}
          <p className="mt-1 text-xs text-gray-500">Enter the product SKU.</p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="video-id">
            Youtube video full link
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
