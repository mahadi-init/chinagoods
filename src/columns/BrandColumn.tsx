"use client";
import DeleteItem from "@/components/native/DeleteItem";
import { ImagepopOver } from "@/components/native/ImagePopOver";
import StatusIndicator from "@/components/native/StatusIndicator";
import { BrandType } from "@/types/brand.t";
import { ColumnDef } from "@tanstack/react-table";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

export const brandColumn: ColumnDef<BrandType>[] = [
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
    accessorKey: "image",
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
    accessorKey: "email",
    header: "EMAIL",
    cell: ({ row }) => {
      return <p>{row.original.email ?? "--------"}</p>;
    },
  },

  {
    accessorKey: "location",
    header: "LOCATION",
    cell: ({ row }) => {
      return <p>{row.original.location ?? "--------"}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-8">
        <Link href={`/dashboard/brand/edit/${row.original._id}`}>
          <PencilIcon size={16} />
        </Link>
        <DeleteItem
          queryUrl={`/brand/delete/${row.original._id}`}
          validationTag="/brand"
          successMessage="Brand deleted successfully"
        />
      </div>
    ),
  },
];
