"use client";

import { Button } from "@/components/ui/button";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    deleteCookie("auth");
    router.replace("/auth/signin");
  };

  return (
    <div className="flex w-full items-center justify-between bg-blue-400 p-2 px-4 font-medium text-white">
      <div className="flex items-center gap-4">
        <Link
          href="/seller"
          className={
            pathname.endsWith("/seller")
              ? "rounded-md bg-purple-700 p-2 font-bold"
              : ""
          }
        >
          Dashboard
        </Link>
        <Link
          href="/seller/profile"
          className={
            pathname.endsWith("/profile")
              ? "rounded-md bg-purple-700 p-2 font-bold"
              : ""
          }
        >
          Profile
        </Link>
        <Link
          href="/seller/order"
          className={
            pathname.endsWith("/order")
              ? "rounded-md bg-purple-700 p-2 font-bold"
              : ""
          }
        >
          Order
        </Link>
        <p
          className={
            pathname.includes("/details")
              ? "rounded-md bg-purple-700 p-2 font-bold"
              : ""
          }
        >
          Details
        </p>
      </div>

      <Button variant={"destructive"} onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
