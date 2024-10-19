"use client";
import DeleteItem from "@/components/native/DeleteItem";
import { HoverToolkit } from "@/components/native/HoverToolkit";
import { ImagepopOver } from "@/components/native/ImagePopOver";
import { ProductType } from "@/types/product.t";
import { TAGS } from "@/types/tags";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Forward, Pencil } from "lucide-react";
import Link from "next/link";
import { FacebookShareButton } from "react-share";

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
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-8">
        {row.original.slug && (
          <>
            <HoverToolkit text="Share">
              <FacebookShareButton
                url={`https://www.chinacup.xyz/shop/${row.original.slug}`}
              >
                <Forward />
              </FacebookShareButton>
            </HoverToolkit>
            <HoverToolkit text="View">
              <Link href={`/shop/${row.original.slug}`} target="_blank">
                <Eye />
              </Link>
            </HoverToolkit>
          </>
        )}

        <HoverToolkit text="Edit">
          <Link href={`/dashboard/product/edit/${row.original._id}`}>
            <Pencil />
          </Link>
        </HoverToolkit>

        <DeleteItem
          queryUrl={`/product/delete/${row.original._id}`}
          validationTag={TAGS.PRODUCTS}
        />
      </div>
    ),
  },
];
