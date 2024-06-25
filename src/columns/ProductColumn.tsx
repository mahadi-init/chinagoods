"use client";
import ProductDetailsDialog from "@/app/dashboard/product/_components/product-details-dialog";
import DeleteItem from "@/components/native/DeleteItem";
import { ImagepopOver } from "@/components/native/ImagePopOver";
import { ProductType } from "@/types/product.t";
import { getLastSixDigit } from "@/utils/get-last-six-digit";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";

export const productColumn: ColumnDef<ProductType>[] = [
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
    cell: ({ row }) => <ProductDetailsDialog id={row.original._id} />,
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
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "price",
    header: "PRICE",
    cell: ({ row }) => {
      return <p>৳ {row.original.price}</p>;
    },
  },
  {
    accessorKey: "quantity",
    header: "QUANTITY",
  },
  {
    accessorKey: "sellCount",
    header: "Sells",
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      return (
        <p
          className={clsx(
            row.original.status === "IN-STOCK"
              ? "text-green-500"
              : "text-red-500",
            "font-medium",
          )}
        >
          {row.original.status}
        </p>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-8">
        <DeleteItem
          queryUrl={`/product/delete/${row.original._id}`}
          validationTag="/product"
          successMessage="Product deleted successfully"
        />
      </div>
    ),
  },
];
