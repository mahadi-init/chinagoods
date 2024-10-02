"use client";
import DeleteItem from "@/components/native/DeleteItem";
import { HoverToolkit } from "@/components/native/HoverToolkit";
import { SellerType } from "@/types/seller.t";
import { TAGS } from "@/types/tags";
import { getDaysAgo } from "@/utils/get-days-ago";
import { ColumnDef } from "@tanstack/react-table";
import { History, PenIcon, ShoppingBag } from "lucide-react";
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
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-8">
        <HoverToolkit text="Order">
          <Link
            href={`/dashboard/sellers/profile/order?id=${row.original._id}&name=${row.original.name}`}
          >
            <ShoppingBag size={18} />
          </Link>
        </HoverToolkit>
        <HoverToolkit text="Payment">
          <Link
            href={`/dashboard/sellers/profile/payment?id=${row.original._id}&name=${row.original.name}`}
          >
            <PenIcon size={18} />
          </Link>
        </HoverToolkit>
        <HoverToolkit text="Payment History">
          <Link
            href={`/dashboard/sellers/profile/history?id=${row.original._id}&name=${row.original.name}`}
          >
            <History size={18} />
          </Link>
        </HoverToolkit>
        <DeleteItem
          queryUrl={`/seller/delete/${row.original._id}`}
          validationTag={TAGS.SELLERS}
        />
      </div>
    ),
  },
];
