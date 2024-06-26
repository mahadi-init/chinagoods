"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function Header() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const router = useRouter();

  return (
    <div className="text- 1font-medium flex w-full items-center justify-between bg-blue-400 p-4 font-bold text-white">
      <div className="flex gap-4">
        <a onClick={() => router.back()} className="cursor-pointer">
          Home
        </a>
        <Link href={`/dashboard/sellers/profile?id=${id}&name=${name}`}>
          Profile
        </Link>
        <Link href={`/dashboard/sellers/profile/order?id=${id}&name=${name}`}>
          Order
        </Link>
      </div>
    </div>
  );
}
