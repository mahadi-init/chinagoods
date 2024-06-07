"use client";
import { buttonVariants } from "@/components/ui/button";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  return (
    <div className="p-4 flex justify-evenly items-center w-screen h-screen">
      <div className="w-full max-w-md">
        <p className="text-4xl font-serif font-bold text-center mb-8 text-amber-500">
          WELCOME
        </p>

        <div className="w-full flex flex-col gap-8">
          <Link
            href="/auth/signin"
            className={clsx("w-full", buttonVariants({ variant: "default" }))}
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className={clsx("w-full", buttonVariants({ variant: "default" }))}
          >
            Signup
          </Link>
        </div>
      </div>

      <div className="hidden justify-center items-center py-10 px-4 sm:py-16 sm:px-6 lg:flex lg:py-24 lg:px-8">
        <div>
          <Image
            className="w-96 h-96"
            width={900}
            height={900}
            src="/logo.png"
            alt="logo"
            loading="lazy"
          />

          <div className="mx-auto mt-3 w-full max-w-md xl:max-w-xl">
            <h3 className="text-2xl font-semibold text-center text-black">
              Your best place for shopping
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
