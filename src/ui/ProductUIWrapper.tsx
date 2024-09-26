"use client";
import { DataTable } from "@/components/native/DataTable";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

interface TableUIWrapperProps<T> {
  columns: ColumnDef<T, unknown>[];
  data: T[];
}

export default function ProductUiWrapper<T>({
  columns,
  data,
}: TableUIWrapperProps<T>) {
  return (
    <div className="mt-4 flex w-full flex-col gap-4">
      <div className="flex w-full justify-end">
        <Link
          href="/dashboard/product/add"
          className={cn(
            buttonVariants({
              variant: "outline",
            }),
          )}
        >
          <PlusIcon /> Add Product
        </Link>
      </div>

      <div className="h-screen">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
