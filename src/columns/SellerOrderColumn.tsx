"use client";
import { OrderType } from "@/types/order.t";
import { getLastSixDigit } from "@/utils/get-last-six-digit";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import Link from "next/link";

export const sellerOrderColumn: ColumnDef<OrderType>[] = [
  {
    accessorKey: "sku",
    header: "SKU",
    cell: ({ row }) => {
      return (
        <Link
          href={`/dashboard/order/details/${row.original._id}`}
          className="cursor-pointer font-medium underline"
        >
          {row.original.cart?.map((item) => item.sku).join(" & ")}
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
  // {
  //   accessorKey: "trackingLink",
  //   header: "TRACKING",
  //   cell: ({ row }) => {
  //     return (
  //       row.original.trackingLink && (
  //         <Link
  //           href={row.original.trackingLink}
  //           className="font-medium text-blue-700"
  //           target="_blank"
  //         >
  //           Visit
  //         </Link>
  //       )
  //     );
  //   },
  // },
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
];
