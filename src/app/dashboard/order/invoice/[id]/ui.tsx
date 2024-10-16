"use client";
import InvoiceGenerator from "@/components/native/InvoiceGenerator";
import { Button } from "@/components/ui/button";
import { OrderType } from "@/types/order.t";
import { getLastSixDigit } from "@/utils/get-last-six-digit";
import { Printer } from "lucide-react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function InvoiceUI({ order }: { order: OrderType }) {
  const ref = useRef(null);

  const handlePrint = useReactToPrint({
    documentTitle: `#${getLastSixDigit(order?._id)}`,
    removeAfterPrint: true,
  });

  return (
    <div className="p-4">
      <div ref={ref} className="h-fit w-fit">
        <InvoiceGenerator data={order} ref={ref} />
      </div>

      <Button
        className="flex items-center gap-2"
        onClick={() => {
          handlePrint(null, () => ref.current);
        }}
      >
        <Printer size={22} />
        Print Invoice
      </Button>
    </div>
  );
}
