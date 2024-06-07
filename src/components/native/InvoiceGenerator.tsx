"use client";
import { OrderType } from "@/types/order.t";
import { forwardRef } from "react";
import { Card } from "../ui/card";

function InvoiceGenerator({ data }: { data?: OrderType }) {
  return (
    <div className="mx-auto my-10 w-full bg-white p-6 shadow-md">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">Super Yammy</h1>
        <p className="text-gray-600"></p>
      </div>
      <Card className="mb-6 border p-4">
        <div className="mb-4 grid grid-cols-3 gap-4">
          <h2 className="col-span-1 text-sm font-bold">PRODUCT</h2>
          <h2 className="col-span-1 text-sm font-bold">QUANTITY</h2>
          <h2 className="col-span-1 text-sm font-bold">TOTAL</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {data?.cart?.map((item) => {
            return (
              <>
                <p className="col-span-1 text-sm">{item.name}</p>
                <p className="col-span-1 text-sm">{item.quantity}</p>
                <p className="col-span-1 text-sm">৳ {item.price}</p>
              </>
            );
          })}
        </div>
      </Card>
      <Card className="mb-6 border p-4">
        <h2 className="mb-4 text-lg font-bold">Order Price</h2>
        <div className="mb-2 grid grid-cols-2 gap-4">
          <p className="text-sm">Subtotal</p>
          <p className="text-sm">৳ {data?.subTotal}</p>
        </div>
        <div className="mb-2 grid grid-cols-2 gap-4">
          <p className="text-sm">Shipping cost:</p>
          <p className="text-sm">৳ {data?.shippingCost}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <p className="text-sm font-bold">Total:</p>
          <p className="text-sm font-bold">৳ {data?.total}</p>
        </div>
      </Card>
      <Card className="mb-6 border p-4">
        <div className="mb-2 grid grid-cols-2 gap-4">
          <p className="text-sm font-bold">Payment Method</p>
          <p className="text-sm">Cash on delivery</p>
        </div>
        <div className="mb-2 grid grid-cols-2 gap-4">
          <p className="text-sm font-bold">Bill No:</p>
          <p className="text-sm"># {data?.invoice}</p>
        </div>
        <div className="mb-2 grid grid-cols-2 gap-4">
          <p className="text-sm font-bold">No of items:</p>
          <p className="text-sm">{data?.cart?.length}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <p className="text-sm font-bold">Date:</p>
          <p className="text-sm">
            {data?.createdAt &&
              new Date(data?.createdAt).toDateString().substring(0, 10)}
          </p>
        </div>
      </Card>
      <div className="text-center">
        <p className="text-lg font-semibold">
          Thank you for your order. Come again!
        </p>
      </div>
    </div>
  );
}

export default forwardRef(InvoiceGenerator);
