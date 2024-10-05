"use client";
import clsx from "clsx";
import { deleteCookie } from "cookies-next";
import {
  CircleUserRound,
  LayoutDashboard,
  LogOut,
  ShoppingBasket,
  ShoppingCartIcon,
  Star,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import ConfirmationDialog from "./ConfirmationDialog";

export default function Sidenav(): JSX.Element {
  const pathname = usePathname();
  const router = useRouter();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const hideSideNav = async () => {
    setIsSideNavOpen(false);
  };

  const handleLogout = async () => {
    deleteCookie("auth");
    router.replace("/auth/signin");
  };

  return (
    <>
      {/* @ts-ignore */}
      <Button
        variant="outline"
        title="Side navigation"
        type="button"
        className={`visible fixed left-2 top-1 z-40 order-10 block h-10 w-10 self-center rounded bg-white opacity-100 lg:hidden ${
          isSideNavOpen
            ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0"
            : ""
        }`}
        aria-haspopup="menu"
        aria-label="Side navigation"
        aria-expanded={isSideNavOpen ? " true" : "false"}
        aria-controls="nav-menu-4"
        onClick={() => setIsSideNavOpen(!isSideNavOpen)}
      >
        <div className="absolute left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-700 transition-all duration-300"
          ></span>
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
          ></span>
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
          ></span>
        </div>
      </Button>

      {/*  <!-- Side Navigation --> */}
      <aside
        id="nav-menu-4"
        aria-label="Side navigation"
        className={`fixed bottom-0 left-0 top-0 z-40 flex w-40 flex-col border-r border-r-slate-200 bg-white transition-transform lg:translate-x-0 ${
          isSideNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav
          aria-label="side navigation"
          className="flex-1 divide-y divide-slate-100 overflow-auto"
        >
          <div>
            <ul className="flex flex-1 flex-col gap-1 py-3">
              <li className="px-3">
                <Link
                  href="/dashboard"
                  onClick={hideSideNav}
                  className={clsx(
                    "flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-500 focus:bg-rose-50",
                    pathname.endsWith("/dashboard") &&
                      "bg-purple-100 text-purple-800",
                  )}
                >
                  <div className="flex items-center self-center">
                    <LayoutDashboard size={18} />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    Dashboard
                  </div>
                </Link>
              </li>

              <li className="px-3">
                <Link
                  href="/dashboard/order"
                  onClick={hideSideNav}
                  className={clsx(
                    "flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-500 focus:bg-rose-50",
                    pathname.endsWith("/dashboard/order") &&
                      "bg-purple-50 text-purple-600",
                  )}
                >
                  <div className="flex items-center self-center">
                    <ShoppingCartIcon size={18} />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    Orders
                  </div>
                </Link>
              </li>

              <li className="px-3">
                <Link
                  href="/dashboard/product"
                  onClick={hideSideNav}
                  className={clsx(
                    "flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-500 focus:bg-rose-50",
                    pathname.includes("product") &&
                      "bg-purple-50 text-purple-600",
                  )}
                >
                  <div className="flex items-center self-center">
                    <ShoppingBasket size={18} />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    Products
                  </div>
                </Link>
              </li>

              <li className="px-3">
                <Link
                  href="/dashboard/sellers"
                  onClick={hideSideNav}
                  className={clsx(
                    "flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-500 focus:bg-rose-50",
                    pathname.includes("sellers") &&
                      "bg-purple-50 text-purple-600",
                  )}
                >
                  <div className="flex items-center self-center">
                    <CircleUserRound size={18} />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    Sellers
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <footer className="border-t border-slate-200 p-3">
          <ConfirmationDialog
            alertText="You will logged out from admin panel"
            action={() => {
              toast.promise(handleLogout, {
                loading: "Loading...",
                success: () => {
                  return `Logout successful`;
                },
                error: "Error",
              });
            }}
          >
            <button className="flex items-center gap-3 rounded p-3 text-slate-900 transition-colors hover:text-rose-500">
              <div className="flex items-center self-center">
                <LogOut size={18} />
              </div>
              <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm font-medium">
                Logout
              </div>
            </button>
          </ConfirmationDialog>
        </footer>
      </aside>

      {/*  <!-- Backdrop --> */}
      <div
        className={`fixed bottom-0 left-0 right-0 top-0 z-30 bg-slate-900/20 transition-colors sm:hidden ${
          isSideNavOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsSideNavOpen(false)}
      ></div>
      {/*  <!-- End Side navigation menu with user profile and alert message --> */}
    </>
  );
}
