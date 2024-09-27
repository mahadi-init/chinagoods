"use client";
import { DataTable } from "@/components/native/DataTable";
import { ColumnDef } from "@tanstack/react-table";

interface TableUIWrapperProps<T> {
  columns: ColumnDef<T, unknown>[];
  data: T[];
}

export default function SellerUIWrapper<T>({
  columns,
  data,
}: TableUIWrapperProps<T>) {
  return (
    <div className="mt-4 flex w-full flex-col gap-4">
      <div className="h-screen">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
