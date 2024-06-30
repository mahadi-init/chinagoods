"use client";
import ChangeConfirmationStatus from "@/components/native/ChangeConfirmStatus";
import DeleteItem from "@/components/native/DeleteItem";
import { HoverToolkit } from "@/components/native/HoverToolkit";
import OrderConfirmationDialog from "@/components/native/OrderConfirmationDialog";
import { OrderType } from "@/types/order.t";
import { getLastSixDigit } from "@/utils/get-last-six-digit";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { ReceiptText, Send } from "lucide-react";
import Link from "next/link";

export const orderColumn: ColumnDef<OrderType>[] = [
  {
    accessorKey: "confirmation",
    header: "CONFIRM",
    cell: ({ row }) => {
      return (
        <ChangeConfirmationStatus
          id={row.original._id}
          confirm={row.original.confirm}
        />
      );
    },
  },
  {
    accessorKey: "invoice",
    header: "INVOICE",
    cell: ({ row }) => {
      return (
        <Link
          href={`/dashboard/order/details/${row.original._id}`}
          className="cursor-pointer font-medium underline"
        >
          # {getLastSixDigit(row.original._id)}
        </Link>
      );
    },
  },
  {
    accessorKey: "sku",
    header: "SKU",
    cell: ({ row }) => {
      return (
        <p className="cursor-pointer font-medium">
          {row.original.cart?.map((item) => item.sku).join(", ")}
        </p>
      );
    },
  },
  {
    accessorKey: "orderBy",
    header: "ORDER BY",
    cell: ({ row }) => {
      return (
        <Link
          href={`/dashboard/sellers/profile?id=${row.original.sellerId}&name=${row.original.sellerName}`}
          className="cursor-pointer font-medium underline"
        >
          {row.original.sellerName}
        </Link>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "CUSTOMER PHONE",
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
            target="_blank"
          >
            Visit
          </Link>
        )
      );
    },
  },
  {
    accessorKey: "consignmentId",
    header: "CONSIGNMENT",
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      let color;

      switch (row.original.status) {
        case "WAITING":
          color = "text-sky-600";
          break;

        case "IN_REVIEW":
          color = "text-yellow-600";
          break;

        case "DELIVERED":
        case "PARTIAL_DELIVERED":
          color = "text-green-600";
          break;

        case "CANCELLED":
        case "HOLD":
          color = "text-red-600";
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
        {row.original.status === "WAITING" && (
          <OrderConfirmationDialog
            alertText={`# ${getLastSixDigit(row.original._id)} will be sent to courir`}
            data={row.original}
          >
            <Send size={18} />
          </OrderConfirmationDialog>
        )}
        <HoverToolkit text="Invoice">
          <Link href={`/dashboard/order/invoice/${row.original._id}`}>
            <ReceiptText size={18} />
          </Link>
        </HoverToolkit>
        <div className="flex items-center gap-8">
          <DeleteItem
            queryUrl={`/order/delete/${row.original._id}`}
            validationTag="/order"
            successMessage="Order deleted successfully"
          />
        </div>
      </div>
    ),
  },
];
