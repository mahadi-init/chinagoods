"use client";
import DeleteItem from "@/components/native/DeleteItem";
import { HoverToolkit } from "@/components/native/HoverToolkit";
import { SellerType } from "@/types/seller.t";
import { TAGS } from "@/types/tags";
import { getDaysAgo } from "@/utils/get-days-ago";
import { ColumnDef } from "@tanstack/react-table";
import { PenIcon } from "lucide-react";
import Link from "next/link";

export const sellerColumn: ColumnDef<SellerType>[] = [
  {
    accessorKey: "name",
    header: "NAME",
    cell: ({ row }) => {
      return (
        <Link
          href={`/dashboard/sellers/profile?id=${row.original._id}&name=${row.original.name}`}
          className="font-medium underline"
        >
          {row.original.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "PHONE",
  },
  {
    accessorKey: "lastPaymentDate",
    header: "PAYMENT DATE",
    cell: ({ row }) => {
      return (
        row.original.lastPaymentDate && (
          <p className="font-semibold text-purple-500">
            {getDaysAgo(row.original.lastPaymentDate)!! <= 0
              ? "Today"
              : getDaysAgo(row.original.lastPaymentDate) + " Days ago"}
          </p>
        )
      );
    },
  },
  {
    accessorKey: "lastPaymentAmount",
    header: "PAYMENT",
    cell: ({ row }) => {
      return (
        row.original.lastPaymentAmount && (
          <p className="font-semibold text-green-600">
            {row.original.lastPaymentAmount} TK
          </p>
        )
      );
    },
  },
  {
    accessorKey: "monthlyDeliveredAtThatPoint",
    header: "DELIVERY COUNT",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-8">
        <Link href={`/dashboard/sellers/edit/${row.original._id}`}>
          <PenIcon size={18} />
        </Link>
        <DeleteItem
          queryUrl={`/seller/delete/${row.original._id}`}
          validationTag={TAGS.SELLERS}
        />
      </div>
    ),
  },
];
