import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { PackageIcon } from "lucide-react";
import { OrderType } from "@/types/order.t";
import Link from "next/link";
import { ImagepopOver } from "./native/ImagePopOver";

export function OrderSummary({ order }: { order?: OrderType }) {
  return (
    <div className="flex flex-col">
      <header className="bg-gray-100 px-6 py-4 dark:bg-gray-950">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PackageIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            <h1 className="text-lg font-semibold">Order Summary</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white">
              {order?.status}
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {/* @ts-expect-error */}
              {new Date(order?.createdAt).toDateString()}
            </span>
          </div>
        </div>
      </header>
      <main className="flex-1 px-4 py-8 text-lg md:px-6">
        <div className="container mx-auto grid gap-8 md:grid-cols-[1fr_300px]">
          <div className="space-y-8">
            <div>
              <h2 className="mb-4 text-xl font-semibold">Shipping Address</h2>
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="font-medium">{order?.name}</p>
                <p className="font-medium">{order?.phone}</p>
                <p className="mt-4 text-gray-500 dark:text-gray-400">
                  {order?.address}
                </p>
              </div>
            </div>
            <div>
              <h2 className="mb-4 text-lg font-semibold">Order Items</h2>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[80px] md:table-cell">
                        Image
                      </TableHead>
                      <TableHead className="max-w-[150px]">Name</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order?.cart?.map((item) => {
                      return (
                        <TableRow key={item._id} className="text-lg">
                          <TableCell className="hidden md:table-cell">
                            <ImagepopOver img={item.img ?? "/logo.png"} />
                          </TableCell>
                          <TableCell className="font-medium">
                            <Link
                              href={`/dashboard/product/details/${item._id}`}
                              className="font-semibold text-gray-800"
                            >
                              {item.name}
                            </Link>
                          </TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>৳ {item.price}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>
              <div className="rounded-lg border border-gray-200 p-4 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>৳ {order?.subTotal}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span>৳ {order?.shippingCost}</span>
                </div>
                <Separator className="my-4" />
                <div className="flex items-center justify-between font-semibold">
                  <span>Total</span>
                  <span>৳ {order?.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
