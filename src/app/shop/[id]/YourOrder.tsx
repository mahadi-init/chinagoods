import { convertEnglishToBengaliNumber } from "@/utils/convert-bangla-english";
import Image from "next/image";

export default function YourOrder({
  img,
  price,
}: {
  img?: string;
  price?: number;
}) {
  return (
    <>
      <p className="text-xl font-semibold">Your order</p>

      <div className="my-6">
        <div className="flex justify-between font-semibold">
          <p>Product</p>
          <p>Subtotal</p>
        </div>

        <hr className="my-4 border-[0.1rem] border-dashed border-gray-400" />

        <div className="flex w-full items-center justify-between">
          <Image
            src={img ?? ""}
            width={500}
            height={500}
            alt="logo"
            className="w-24 rounded-md"
          />
          <p>× 1 &nbsp; {convertEnglishToBengaliNumber(price!!)} ৳</p>
        </div>
        <hr className="my-4 border-[0.1rem] border-dashed border-gray-400" />

        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>{convertEnglishToBengaliNumber(price!!)} ৳</p>
          </div>

          <div className="flex justify-between">
            <p>Shipping</p>
            <p>Free Shipping</p>
          </div>
        </div>

        <hr className="my-4 border-[0.1rem] border-dashed border-gray-400" />

        <div className="flex justify-between font-bold">
          <p>Total</p>
          <p>{convertEnglishToBengaliNumber(price!!)} ৳</p>
        </div>
      </div>
    </>
  );
}
