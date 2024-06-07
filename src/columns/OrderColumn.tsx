"use client";
import ConfirmationDialog from "@/components/native/ConfirmationDialog";
import DeleteItem from "@/components/native/DeleteItem";
import DeliveryStatus from "@/components/native/DeliveryStatus";
import { HoverToolkit } from "@/components/native/HoverToolkit";
import OrderConfirmationDialog from "@/components/native/OrderConfirmationDialog";
import StatusIndicator from "@/components/native/StatusIndicator";
import { OrderType } from "@/types/order.t";
import { getDaysAgo } from "@/utils/get-days-ago";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { Eye, ReceiptText, Send, View } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { date } from "zod";

export const orderColumn: ColumnDef<OrderType>[] = [
  {
    accessorKey: "invoice",
    header: "INVOICE",
    cell: ({ row }) => {
      return (
        <Link
          href={`/dashboard/order/details/${row.original._id}`}
          className="cursor-pointer font-medium underline"
        >
          # {row.original.invoice}
        </Link>
      );
    },
  },
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "address",
    header: "ADDRESS",
  },
  {
    accessorKey: "phone",
    header: "PHONE",
  },
  {
    accessorKey: "total",
    header: "TOTAL",
    cell: ({ row }) => {
      return <p className="font-medium">৳ {row.original.total}</p>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "TIME",
    cell: ({ row }) => {
      return (
        <p className="font-medium">
          {/* @ts-ignore */}
          {new Date(row.original.createdAt).toLocaleTimeString()}
        </p>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "DATE",
    cell: ({ row }) => {
      return (
        <p className="font-medium">
          {/* @ts-ignore */}
          {new Date(row.original.createdAt).toDateString()}
        </p>
      );
    },
  },
  {
    accessorKey: "trackingLink",
    header: "TRACKING",
    cell: ({ row }) => {
      return (
        row.original.trackingLink && (
          <Link
            href={row.original.trackingLink}
            className="font-medium text-blue-700"
          >
            Visit
          </Link>
        )
      );
    },
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      let color;

      switch (row.original.status) {
        case "CANCELLED":
        case "HOLD":
          color = "text-red-600";
          break;

        case "IN_REVIEW":
          color = "text-yellow-600";
          break;

        case "DELIVERED":
        case "PARTIAL_DELIVERED":
          color = "text-green-600";
          break;

        default:
          color = "text-pink-600";
      }

      return (
        <p className={clsx(color, "font-semibold")}>{row.original.status}</p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex gap-8">
        <OrderConfirmationDialog
          alertText={`# ${row.original.invoice} will be sent to courir`}
          data={row.original}
        >
          <Send size={18} />
        </OrderConfirmationDialog>
        <HoverToolkit text="Invoice">
          <Link href={`/dashboard/order/invoice/${row.original._id}`}>
            <ReceiptText size={18} />
          </Link>
        </HoverToolkit>
        <DeleteItem
          queryUrl={`/order/delete/${row.original._id}`}
          validationTag="/order"
          successMessage="Order deleted successfully"
        />
      </div>
    ),
  },
];
