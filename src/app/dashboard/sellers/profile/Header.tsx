"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Header() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  return (
    <>
      <div className="text- 1font-medium flex w-full items-center justify-between bg-blue-400 p-4 font-bold text-white">
        <div className="flex gap-4">
          <Link href={`/dashboard/sellers/profile?id=${id}&name=${name}`}>
            Profile
          </Link>
          <Link href={`/dashboard/sellers/profile/order?id=${id}&name=${name}`}>
            Order
          </Link>
          <Link
            href={`/dashboard/sellers/profile/payment?id=${id}&name=${name}`}
          >
            Payment
          </Link>
        </div>
      </div>
      <div className="mt-1 flex flex-col gap-1 font-medium">
        <p>Name : {name}</p>
        <p>ID : {id}</p>
      </div>
    </>
  );
}
