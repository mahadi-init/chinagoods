"use client";
import DeleteItem from "@/components/native/DeleteItem";
import { SellerType } from "@/types/seller.t";
import { TAGS } from "@/types/tags";
import { ColumnDef } from "@tanstack/react-table";
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
        <DeleteItem
          queryUrl={`/seller/delete/${row.original._id}`}
          validationTag={TAGS.SELLERS}
        />
      </div>
    ),
  },
];
