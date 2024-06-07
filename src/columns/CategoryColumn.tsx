"use client";
import DeleteItem from "@/components/native/DeleteItem";
import StatusIndicator from "@/components/native/StatusIndicator";
import { CategoryType } from "@/types/category.t";
import { ColumnDef } from "@tanstack/react-table";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import { ImagepopOver } from "@/components/native/ImagePopOver";

export const categoryColumn: ColumnDef<CategoryType>[] = [
  {
    accessorKey: "index",
    header: "INDEX",
    cell: ({ row }) => {
      return <p># {row.index + 1}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "img",
    header: "IMAGE",
    cell: ({ row }) => {
      return row.original.img ? (
        <ImagepopOver img={row.original.img} />
      ) : (
        <span className="text-xs">No Image</span>
      );
    },
  },
  {
    accessorKey: "productType",
    header: "PRODUCT TYPE",
  },
  {
    accessorKey: "children",
    header: "ITEMS",
    cell: ({ row }) => {
      return row.original.children?.length;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-8">
        <Link href={`/dashboard/category/edit/${row.original._id}`}>
          <PencilIcon size={16} />
        </Link>
        <DeleteItem
          queryUrl={`/category/delete/${row.original._id}`}
          validationTag="/category"
          successMessage="Category deleted successfully"
        />
      </div>
    ),
  },
];
