"use client";
import { OrderType } from "@/types/order.t";
import { forwardRef } from "react";
import { Card } from "../ui/card";
import { getLastSixDigit } from "@/utils/get-last-six-digit";

function InvoiceGenerator({ data }: { data?: OrderType }) {
  return (
    <Card className="mb-10 w-48 p-2">
      <p className="text-center font-bold">China Goods</p>
      <p className="text-center font-medium"># {getLastSixDigit(data?._id)}</p>
      <div className="mt-2 flex w-full flex-col justify-center gap-1 text-sm">
        <p>Name : {data?.name}</p>
        <p>Phone : {data?.phone}</p>
        <p>Address : {data?.address}</p>
      </div>

      <div className="mt-4 flex w-full justify-between rounded-lg border-2 border-black p-1">
        <p>COD :</p>
        <p>{data?.total}</p>
      </div>
    </Card>
  );
}

export default forwardRef(InvoiceGenerator);
