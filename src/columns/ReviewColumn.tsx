"use client";
import DeleteItem from "@/components/native/DeleteItem";
import StatusIndicator from "@/components/native/StatusIndicator";
import { Button } from "@/components/ui/button";
import { ReviewType } from "@/types/review.t";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const reviewColumn: ColumnDef<ReviewType>[] = [
  {
    accessorKey: "index",
    header: "INDEX",
    cell: ({ row }) => {
      return <p># {row.index + 1}</p>;
    },
  },
  {
    accessorKey: "product.name",
    header: "PRODUCT",
    cell: ({ row }) => {
      return (
        <Link
          href={`/dashboard/product/details/${row.original?.product?._id}`}
          className="underline"
        >
          {row.original?.product?.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "product.img",
    header: "IMAGE",
    cell: ({ row }) => {
      return row.original.product?.img ? (
        <picture>
          <Image
            className="w-10"
            width={250}
            height={250}
            src={row.original.product.img}
            alt="cell image"
            loading="lazy"
          />
        </picture>
      ) : (
        <span className="text-xs">No Image</span>
      );
    },
  },
  {
    accessorKey: "name",
    header: "USER",
  },
  {
    accessorKey: "rating",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          RATING
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "comment",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          COMMENT
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "approved",
    header: "APPROVED",
    cell: ({ row }) => {
      return !row.original.approved ? (
        <StatusIndicator
          status={row.original.approved}
          updateStatusUrl={`/review/approve/${row.original._id}`}
          mutationTag="/review/all"
          variant="secondary"
          text="PENDING"
        />
      ) : (
        <Check color="green" />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-8">
        <DeleteItem
          queryUrl={`/review/delete/${row.original._id}`}
          validationTag="/review/all"
          successMessage="Review deleted successfully"
        />
      </div>
    ),
  },
];
