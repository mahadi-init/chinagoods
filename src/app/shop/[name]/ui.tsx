"use client";
import Image from "next/image";
import { Noto_Sans_Bengali } from "next/font/google";
import OrderNowButton from "../OrderNowButton";
import { cn } from "@/lib/utils";
import { Check, CheckCheck, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import InfoForm from "./InfoForm";
import YourOrder from "./YourOrder";
import { Button } from "@/components/ui/button";

const noto = Noto_Sans_Bengali({ subsets: ["latin"] });

export default function ProductDeatils() {
  return (
    <div
      className={cn(
        "flex h-[98vh] w-[98vw] flex-col items-center p-4",
        noto.className,
      )}
    >
      <Image
        src="/logo.jpg"
        width={500}
        height={500}
        alt="logo"
        className="w-36 rounded-full"
      />
      <div className="w-7/12">
        <div className="mt-8 flex flex-col items-center gap-4">
          <p className="text-5xl font-semibold">
            ১০০% সিলিকনের তৈরি অরিজিনাল ম্যাজিক কনডম!
          </p>
          <p className="text-ellipsis text-center text-2xl font-medium">
            যাদের গোপনাঙ্গ ছোট, বাজারের অনেক ঔষধ খেয়েও কোন ভাল ফলাফল পাননি,
            তাদের জন্য ম্যাজিক কনডম হল তাৎক্ষণিক সমাধান।এই কনডমটি ৫০০ বারের উপরে
            ব্যবহার করতে পারবেন, ৩০-৪০ মিনিট পর্যন্ত একটানা সহ*বাস করতে পারবেন
          </p>
          <div>
            <iframe
              width="876"
              height="493"
              src="https://www.youtube.com/embed/gLudNOh2hp8"
              title="Magic Boss"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              className="mt-6 w-[70rem]"
            />
            <div className="w-full bg-gray-400 py-4 text-center text-xl font-semibold text-white">
              <p>বিস্তারিত জানতে ভিডিওটি দেখুন</p>
            </div>
          </div>

          <OrderNowButton style="my-6" />

          <div className="mt-6 flex w-full flex-wrap justify-between gap-6">
            {new Array(3).fill(1).map((item, index) => {
              return (
                <Image
                  key={index}
                  src="/logo.jpg"
                  width={500}
                  height={500}
                  alt="logo"
                  className="w-52 rounded-full"
                />
              );
            })}
          </div>

          <div className="my-6 flex w-screen flex-col items-center bg-gray-100 py-12">
            <p className="w-7/12 text-center text-3xl font-medium">
              যাদের গোপনাঙ্গ ছোট, বাজারের অনেক ঔষধ খেয়েও কোন ভাল ফলাফল পাননি,
              তাদের জন্য ম্যাজিক কনডম হল তাৎক্ষণিক সমাধান।
            </p>
            <OrderNowButton style="my-6" />
          </div>

          <div className="mt-6">
            <p className="text-center text-5xl font-semibold">
              কেন নিবেন এই ম্যাজিক কনডম?
            </p>
            <p className="mt-6 text-center text-2xl font-semibold">
              আপনি কি আপনার স্ত্রীকে সুখী দেখতে চান? আপনি কি আপনার স্ত্রীকে আরো
              অধিক আনন্দ দিতে চান? তাহলে সাধারণ কনডম বাদ দিয়ে ম্যাজিক কনডম
              ব্যাবহার করুন (এই কনডমটি সিলিকনের তৈরি)
            </p>

            <div className="mt-6 flex flex-col gap-12 pl-12">
              {new Array(5).fill(1).map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-2xl font-medium"
                  >
                    <CheckCheck />
                    <p>এই কনডম খুবই নরম এবং পিচ্ছিল।</p>
                  </div>
                );
              })}
            </div>
          </div>

          <OrderNowButton style="my-6" />

          <div className="mt-16 w-7/12">
            <p className="text-center text-4xl font-semibold">
              প্রোডাক্টের মূল্য
            </p>

            <div className="mt-6 flex flex-col gap-6">
              <div className="flex justify-between">
                <p className="text-3xl font-semibold">নিয়মিত মূল্য</p>
                <p className="text-3xl font-semibold line-through">৯৯০ টাকা</p>
              </div>

              <div className="flex justify-between">
                <p className="text-3xl font-semibold">অফার মূল্য</p>
                <p className="text-3xl font-semibold">৭২০ টাকা</p>
              </div>
            </div>
          </div>
          <Card className="my-6 flex w-full flex-col items-center gap-6 p-6 shadow-2xl">
            <p className="text-2xl font-semibold">
              আগামী ২৪ ঘন্টার মধ্যে অর্ডার করলে ডেলিভারি চার্জ ফ্রি!
            </p>
            <OrderNowButton />

            <div className="rounded-md border-4 border-black bg-yellow-400 p-4">
              <p className="text-center text-2xl font-semibold">
                বিঃদ্রঃ- ছবি এবং বর্ণনার সাথে পণ্যের মিল থাকা সত্যেও আপনি পণ্য
                গ্রহন করতে না চাইলে কুরিয়ার চার্জ ১০০ টাকা দিয়ে রিটার্ন করতে
                হবে।
              </p>
            </div>
          </Card>

          <div className="mt-24 w-9/12">
            <InfoForm />
          </div>

          <div className="mt-6 w-9/12">
            <YourOrder />
          </div>

          <div className="w-9/12 bg-gray-100 p-6">
            <p>Cash on delivery</p>
            <div className="ml-6 mt-2 rounded-3xl rounded-tl-none bg-gray-200 p-4">
              <p>Pay with cash on delivery</p>
            </div>
          </div>

          <Button className="w-9/12 rounded-none bg-orange-600">
            অর্ডার কনফার্ম করুন! 720.00৳
          </Button>

          <div className="pb-12"></div>
        </div>
      </div>
    </div>
  );
}
