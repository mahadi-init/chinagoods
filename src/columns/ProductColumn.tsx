"use client";
import DeleteItem from "@/components/native/DeleteItem";
import { ImagepopOver } from "@/components/native/ImagePopOver";
import { ProductType } from "@/types/product.t";
import { ColumnDef } from "@tanstack/react-table";

export const productColumn: ColumnDef<ProductType>[] = [
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
