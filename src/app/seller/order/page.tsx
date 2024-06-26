"use client";

import SubmitButton from "@/components/native/SubmitButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useStatus from "@/hooks/useStatus";
import addRequest from "@/https/add-request";
import { fetcher } from "@/https/get-request";
import { OrderSchema, OrderType } from "@/types/order.t";
import { ProductType } from "@/types/product.t";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect } from "react";
import {
  useFieldArray,
  useForm,
  SubmitHandler,
  Controller,
} from "react-hook-form";
import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export default function Order() {
  const { data: products } = useSWR<ProductType[]>("/product/all", fetcher);
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<OrderType>({
    resolver: zodResolver(OrderSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    // @ts-ignore
    name: "order",
  });

  const { trigger, isMutating } = useSWRMutation("/order/add", addRequest);
  const { showStatus } = useStatus();

  useEffect(() => {
    if (fields.length === 0) {
      append({});
    }
  }, [append, fields.length]);

  const onSubmit: SubmitHandler<OrderType> = async (data) => {
    if (!data.cart || data.cart?.length === 0) {
      toast.error("No products added");
      return;
    }

    let subtotal = 0;
    let total = 0;
    let shippingCost = 120;
    let cart: any[] = [];
    let sku = "";

    data.cart.forEach((item, index) => {
      const product = products?.find((p) => p._id === item._id);

      if (!product) {
        return;
      }

      cart.push({
        _id: product._id,
        name: product.name,
        price: item.price,
        quantity: item.quantity,
        img: product.img,
        sku: product.sku,
      });
      subtotal += Number(item.price) * Number(item.quantity);

      if (index !== data.cart!!.length - 1) {
        sku += product.sku + " - ";
      } else {
        sku += product.sku;
      }
    });

    total = subtotal + shippingCost;

    const order = {
      name: data.name,
      phone: data.phone,
      address: data.address,
      cart,
      shippingCost,
      subTotal: subtotal,
      total,
      status: "PENDING",
      sku: sku,
      sellerName: localStorage.getItem("authName") as string,
      sellerId: localStorage.getItem("authId") as string,
    };

    const res = await trigger(order);
    showStatus("/order", "Order send successully", res);
    reset();
  };

  return (
    <div>
      <p className="mt-2 text-center text-3xl font-bold text-gray-800">
        Create new order
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-8 p-4"
      >
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="name">
            Name <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            id="name"
            placeholder="Enter name"
            {...register("name", { required: true })}
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
            {...register("phone", { required: true })}
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
            {...register("address", { required: true })}
          />
          {errors.address && (
            <span className="text-xs text-red-700">
              {errors.address.message}
            </span>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="product">
            Select Products <span className="text-red-500">*</span>
          </label>
          {fields.map((field, index) => (
            <div className="mt-4 flex gap-4" key={field.id}>
              <Controller
                name={`cart.${index}._id`}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select onValueChange={onChange} value={value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {products?.map((product) => {
                          return (
                            <SelectItem
                              key={product._id}
                              value={product._id as string}
                            >
                              <div className="flex items-center gap-2">
                                <Image
                                  src={product.img ?? ""}
                                  alt="product image"
                                  width={24}
                                  height={24}
                                  className="rounded-sm"
                                />
                                <div className="flex gap-4">
                                  <p>TITLE: {product.name}</p>
                                  <p>PRICE: {product.price}</p>
                                  <p>SKU: {product.price}</p>
                                </div>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />

              <div>
                <Input
                  type="number"
                  id="quantity"
                  placeholder="Enter quantity"
                  {...register(`cart.${index}.quantity`, {
                    required: true,
                  })}
                />
                {errors.cart?.[index]?.quantity && (
                  <span className="text-xs text-red-700">
                    {errors.cart?.[index]?.quantity?.message}
                  </span>
                )}
              </div>

              <div>
                <Input
                  type="number"
                  id="price"
                  placeholder="Enter Price"
                  {...register(`cart.${index}.price`, {
                    required: true,
                  })}
                />
                {errors.cart?.[index]?.price && (
                  <span className="text-xs text-red-700">
                    {errors.cart?.[index]?.price?.message}
                  </span>
                )}
              </div>

              <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
              >
                Remove
              </Button>

              <Button
                type="button"
                variant="default"
                onClick={() => append({})}
              >
                Add
              </Button>
            </div>
          ))}
        </div>

        <SubmitButton isMutating={isMutating} />
      </form>
    </div>
  );
}
