"use client";

import { Button } from "@/components/ui/button";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    deleteCookie("auth");
    router.replace("/auth/signin");
  };

  return (
    <div className="flex w-full items-center justify-between bg-blue-400 p-2 px-4 font-medium text-white">
      <div className="flex gap-4">
        <Link href="/seller">Dashboard</Link>
        <Link href="/seller/profile">Profile</Link>
        <Link href="/seller/order">Order</Link>
      </div>

      <Button variant={"destructive"} onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
