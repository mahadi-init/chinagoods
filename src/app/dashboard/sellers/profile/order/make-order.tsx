"use client";

import { sendOrder } from "@/actions/action";
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
import { OrderSchema, OrderType } from "@/types/order.t";
import { ProductType } from "@/types/product.t";
import {
  convertBengaliToEnglish,
  convertBengaliToEnglishNumber,
} from "@/utils/convert-bangla-english";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useEffect, useTransition } from "react";
import {
  useFieldArray,
  useForm,
  SubmitHandler,
  Controller,
} from "react-hook-form";
import { toast } from "sonner";

export default function MakeOrder({ products }: { products: ProductType[] }) {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [isMutating, startTransition] = useTransition();
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
    name: "cart",
  });

  // auto append first array field
  useEffect(() => {
    if (fields.length === 0) {
      append({});
    }
  }, [append, fields.length]);

  // order submission
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
      const price = convertBengaliToEnglishNumber(item.price?.trim() as string);

      if (!product) {
        return;
      }

      cart.push({
        _id: product._id,
        name: product.name,
        price: price,
        quantity: 1,
        img: product.img,
        sku: product.sku,
      });

      subtotal += Number(price);

      if (index !== data.cart!!.length - 1) {
        sku += product.sku + " & ";
      } else {
        sku += product.sku;
      }
    });

    total = subtotal;

    if (total === 0) {
      toast.error("Error submitting order");
      return;
    }

    const order = {
      name: data.name,
      phone: convertBengaliToEnglish(data.phone as string),
      address: data.address,
      cart,
      shippingCost,
      subTotal: subtotal,
      total,
      status: "WAITING",
      sku: sku,
      note: data.note,
      sellerName: name,
      sellerId: id,
    };

    startTransition(async () => {
      const res = await sendOrder(order);
      if (res) {
        toast.success("Order send successfully");
        reset();
      } else {
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <div>
      <div className="mt-1 flex flex-col gap-1 font-medium">
        <p>Name : {name}</p>
        <p>ID : {id}</p>
      </div>
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
            placeholder="Enter phone (bn/en)"
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
          <label className="mb-1 block text-sm font-medium" htmlFor="note">
            Note
          </label>
          <Input
            type="text"
            id="note"
            placeholder="Enter note"
            {...register("note")}
          />
          {errors.note && (
            <span className="text-xs text-red-700">{errors.note.message}</span>
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
                                <div className="flex gap-4">
                                  <p className="font-bold">{product.name}</p>
                                  <p>{" - "}</p>
                                  <p className="font-medium text-green-700">
                                    {product.sku}
                                  </p>
                                  <p>{" - "}</p>
                                  <p>{product.price} TK</p>
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
                  id="price"
                  placeholder="Price (bn/en)"
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
