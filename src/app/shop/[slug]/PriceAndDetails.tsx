import { Card } from "@/components/ui/card";
import OrderNowButton from "../OrderNowButton";
import { convertEnglishToBengaliNumber } from "@/utils/convert-bangla-english";

export default function PriceAndDetails({
  price,
  afterPrice,
}: {
  price?: number;
  afterPrice?: number;
}) {
  return (
    <>
      <div className="mt-6 w-full">
        <p className="text-center text-2xl font-semibold">প্রোডাক্টের মূল্য</p>

        <div className="mt-6 flex w-full flex-col gap-6">
          {afterPrice && (
            <div className="flex justify-between">
              <p className="text-xl font-semibold">নিয়মিত মূল্য</p>
              <p className="text-xl font-semibold line-through">
                {convertEnglishToBengaliNumber(price!!)}
                টাকা
              </p>
            </div>
          )}

          <div className="flex justify-between">
            <p className="text-xl font-semibold">অফার মূল্য</p>
            <p className="text-xl font-semibold">
              {convertEnglishToBengaliNumber(afterPrice ?? price!!)} টাকা
            </p>
          </div>
        </div>
      </div>
      <Card className="my-6 flex w-full flex-col items-center gap-6 p-2 py-4 shadow-2xl">
        <p className="text-xl font-semibold">
          আগামী ২৪ ঘন্টার মধ্যে অর্ডার করলে ডেলিভারি চার্জ ফ্রি!
        </p>
        <OrderNowButton />

        <div className="rounded-md border-4 border-black bg-yellow-400 p-2">
          <p className="text-lg font-semibold">
            বিঃদ্রঃ- ছবি এবং বর্ণনার সাথে পণ্যের মিল থাকা সত্যেও আপনি পণ্য গ্রহন
            করতে না চাইলে কুরিয়ার চার্জ ১০০ টাকা দিয়ে রিটার্ন করতে হবে।
          </p>
        </div>
      </Card>
    </>
  );
}
