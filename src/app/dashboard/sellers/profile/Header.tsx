"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Header() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const pathname = usePathname();

  return (
    <>
      <div className="text- 1font-medium flex w-full items-center justify-between bg-blue-400 p-4 font-bold text-white">
        <div className="flex items-center gap-4">
          <Link
            href={`/dashboard/sellers/profile?id=${id}&name=${name}`}
            className={
              pathname.endsWith("/profile")
                ? "rounded-md bg-purple-700 p-2 font-bold"
                : ""
            }
          >
            Profile
          </Link>
          <Link
            href={`/dashboard/sellers/profile/order?id=${id}&name=${name}`}
            className={
              pathname.endsWith("/order")
                ? "rounded-md bg-purple-700 p-2 font-bold"
                : ""
            }
          >
            Order
          </Link>
          <Link
            href={`/dashboard/sellers/profile/payment?id=${id}&name=${name}`}
            className={
              pathname.endsWith("/payment")
                ? "rounded-md bg-purple-700 p-2 font-bold"
                : ""
            }
          >
            Payment
          </Link>
          <Link
            href={`/dashboard/sellers/profile/history?id=${id}&name=${name}`}
            className={
              pathname.endsWith("/history")
                ? "rounded-md bg-purple-700 p-2 font-bold"
                : ""
            }
          >
            History
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
