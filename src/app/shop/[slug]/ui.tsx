"use client";
import Image from "next/image";
import { Noto_Sans_Bengali } from "next/font/google";
import OrderNowButton from "../OrderNowButton";
import { cn } from "@/lib/utils";
import { CheckCheck } from "lucide-react";
import InfoForm from "./InfoForm";
import YourOrder from "./YourOrder";
import { ProductType } from "@/types/product.t";
import PriceAndDetails from "./PriceAndDetails";

const noto = Noto_Sans_Bengali({ subsets: ["latin"] });

export default function ProductDeatils({ data }: { data: ProductType }) {
  return (
    <div className={cn("flex flex-col items-center p-4", noto.className)}>
      <Image
        src="/logo.jpg"
        width={500}
        height={500}
        alt="logo"
        className="w-36 rounded-full"
      />
      <div className="mt-6 w-full lg:w-5/12">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-2xl font-semibold lg:text-3xl">{data.name}</p>
          <p className="text-ellipsis text-center text-lg font-medium lg:text-xl">
            {data.description}
          </p>

          {data.videoId && (
            <div>
              <iframe
                width="876"
                height="493"
                src={data.videoId}
                title="Magic Boss"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="mt-12 aspect-video w-full rounded-t-md"
              />
              <div className="w-full rounded-b-md bg-gray-400 py-4 text-center text-xl font-semibold text-white">
                <p>বিস্তারিত জানতে ভিডিওটি দেখুন</p>
              </div>
            </div>
          )}

          <OrderNowButton style="my-6" />

          <div className="mt-12 flex w-full flex-wrap justify-around gap-6">
            {data?.images?.map((item, index) => {
              return (
                <Image
                  key={index}
                  src={item}
                  width={500}
                  height={500}
                  alt="logo"
                  className="w-72 rounded-md"
                />
              );
            })}
          </div>

          {data.extraDes && (
            <div className="mt-12 flex flex-col items-center rounded-md bg-gray-100 p-6">
              <p className="text-center text-2xl font-medium">
                {data.extraDes}
              </p>
              <OrderNowButton style="mt-6" />
            </div>
          )}

          <div className="mt-12">
            <p className="text-center text-2xl font-semibold">
              কেন নিবেন এই {data.name}?
            </p>
            <p className="mt-6 text-center text-xl font-semibold">
              {data.whyBuy}
            </p>

            <div className="mt-6 flex flex-col gap-6 font-medium lg:text-lg">
              {data?.whyBuyReasons?.map((item, index) => {
                return (
                  <div key={index} className="flex gap-2 text-start text-lg">
                    <CheckCheck />
                    <p>{item}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <OrderNowButton style="my-4" />

          {/*NOTE: WORK WITH NUMBERS START HERE */}
          <div className="mt-12">
            <PriceAndDetails price={data.price} afterPrice={data.afterPrice} />
          </div>

          <div className="mt-12 w-full">
            <div id="order">
              <div className="mt-6 w-full">
                <YourOrder
                  img={data.images && data.images[0]}
                  price={data.afterPrice ?? data.price}
                />
              </div>

              <div className="mt-16">
                <InfoForm product={data} />
              </div>
            </div>
          </div>

          <div className="pb-12"></div>
        </div>
      </div>
    </div>
  );
}

// <iframe width="1280" height="720" src="https://www.youtube.com/embed/AuHqwQsf64o" title="An Early Glimpse of TanStack Start" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
