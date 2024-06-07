import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { OrderType } from "@/types/order.t";

export function OrderInvoice({ order }: { order: OrderType }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-gray-200 bg-gray-100 px-6 py-4 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Order #12345</h1>
            <p className="text-gray-500 dark:text-gray-400">Order Confirmed</p>
          </div>
          <div className="flex items-center gap-4">
            <Link className="text-blue-600 hover:underline" href="#">
              View Order Details
            </Link>
            <Button variant="outline">Print</Button>
          </div>
        </div>
      </header>
      <main className="flex-1 p-6 md:p-10">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-xl font-bold">Customer Info</h2>
            <div className="grid gap-2">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Name:</p>
                <p>John Doe</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Address:</p>
                <p>123 Main St, Anytown USA</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Phone:</p>
                <p>555-1234</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-bold">Order Summary</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Acme Widget</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>$19.99</TableCell>
                  <TableCell>$39.98</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Acme Gadget</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>$29.99</TableCell>
                  <TableCell>$29.99</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <p className="text-gray-500 dark:text-gray-400">Subtotal:</p>
                <p>$69.97</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-500 dark:text-gray-400">Shipping:</p>
                <p>$5.00</p>
              </div>
              <div className="flex items-center justify-between font-bold">
                <p>Total:</p>
                <p>$74.97</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
