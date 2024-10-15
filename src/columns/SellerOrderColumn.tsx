"use client";
import { HoverToolkit } from "@/components/native/HoverToolkit";
import { OrderType } from "@/types/order.t";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { PenIcon } from "lucide-react";
import Link from "next/link";

export const sellerOrderColumn: ColumnDef<OrderType>[] = [
  {
    accessorKey: "confirmation",
    header: "CONFIRM",
    cell: ({ row }) => {
      return (
        <p
          className={clsx(
            "font-bold",
            row.original.confirm === "OK"
              ? "text-green-700"
              : row.original.confirm === "NO"
                ? "text-red-700"
                : "text-yellow-600",
          )}
        >
          {row.original.confirm}
        </p>
      );
    },
  },
  {
    accessorKey: "sku",
    header: "SKU",
    cell: ({ row }) => {
      return (
        <Link
          href={`/seller/order/details/${row.original._id}`}
          className="cursor-pointer font-medium underline"
        >
          {row.original.cart?.map((item) => item.sku).join(" & ")}
        </Link>
      );
    },
  },
  {
    accessorKey: "duplicate",
    header: "DUP",
    cell: ({ row }) => {
      return (
        <p className="font-bold text-red-700">
          {row.original.duplicate && "YES"}
        </p>
      );
    },
  },
  {
    accessorKey: "name",
    header: "NAME",
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
    header: "DATE",
    cell: ({ row }) => {
      return (
        <p className="font-medium">
          {/* @ts-expect-error */}
          {new Date(row.original.createdAt).toLocaleDateString("en-GB")}
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
  // {
  //   accessorKey: "consignmentId",
  //   header: "CONSIGNMENT",
  // },
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
          // case "PARTIAL_DELIVERED":
          color = "text-green-600";
          break;

        case "CANCELLED":
          // case "HOLD":
          color = "text-red-600";
          break;

        default:
          color = "text-purple-600";
      }

      return (
        <p className={clsx(color, "font-semibold")}>{row.original.status}</p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex justify-end gap-8">
        {row.original.status === "WAITING" && (
          <HoverToolkit text="Edit">
            <Link href={`/seller/order/edit/${row.original._id}`}>
              <PenIcon size={18} />
            </Link>
          </HoverToolkit>
        )}
      </div>
    ),
  },
];
