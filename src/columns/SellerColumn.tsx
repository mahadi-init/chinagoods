"use client";
import ProductDetailsDialog from "@/app/dashboard/product/_components/product-details-dialog";
import DeleteItem from "@/components/native/DeleteItem";
import { ImagepopOver } from "@/components/native/ImagePopOver";
import { SellerType } from "@/types/seller.t";
import { getLastSixDigit } from "@/utils/get-last-six-digit";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const sellerColumn: ColumnDef<SellerType>[] = [
  {
    accessorKey: "_id",
    header: "ID",
    cell: ({ row }) => {
      return <p># {getLastSixDigit(row.original._id)}</p>;
    },
  },
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
          validationTag="/seller"
          successMessage="Seller deleted successfully"
        />
      </div>
    ),
  },
];
