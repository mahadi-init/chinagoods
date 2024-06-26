"use client";
import ProductDetailsDialog from "@/app/dashboard/product/_components/product-details-dialog";
import DeleteItem from "@/components/native/DeleteItem";
import { ImagepopOver } from "@/components/native/ImagePopOver";
import { SellerType } from "@/types/seller.t";
import { getLastSixDigit } from "@/utils/get-last-six-digit";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
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
          href={`/seller/details/${row.original._id}`}
          className="font-medium underline"
          target="_blank"
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
  // {
  //   id: "actions",
  //   cell: ({ row }) => (
  //     <div className="flex items-center gap-8">
  //       <DeleteItem
  //         queryUrl={`/product/delete/${row.original._id}`}
  //         validationTag="/product"
  //         successMessage="Product deleted successfully"
  //       />
  //     </div>
  //   ),
  // },
];
