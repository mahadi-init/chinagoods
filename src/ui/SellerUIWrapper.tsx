"use client";
import { DataTable } from "@/components/native/DataTable";
import FetchErrorMessage from "@/components/native/FetchErrorMessage";
import SixSkeleton from "@/components/native/SixSkeleton";
import TablePagination from "@/components/native/TablePagination";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/https/get-request";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface TableUIWrapperProps<T> {
  route: string;
  columns: ColumnDef<T, unknown>[];
}

export default function SellerUIWrapper<T>({
  route,
  columns,
}: TableUIWrapperProps<T>) {
  const limit = 10;
  const [index, setIndex] = useState(1);
  const [temp, setTemp] = useState<string>();
  const [search, setSearch] = useState<string>();
  const [filteredItems, setFilteredItems] = useState<T[]>();

  // fetch all data using pagination
  const { data, error, isLoading, mutate } = useSWR<T[]>(
    `${route}/page?page=${index}&limit=${limit}`,
    fetcher,
  );

  // fetch total number of pages
  const {
    data: totalPages,
    error: totalPagesError,
    isLoading: isTotalPagesLoading,
  } = useSWR<number>(`${route}/total-pages`, fetcher);

  // fetch filtered data
  const { data: filter, isLoading: isSearchLoading } = useSWR<T[]>(
    search && `${route}/search?q=${search}`,
    fetcher,
    {
      refreshInterval: 1000,
    },
  );

  // filter by search
  useEffect(() => {
    if (search) {
      setFilteredItems(filter);
    } else {
      setFilteredItems(data);
    }
  }, [filter, data, search]);

  // temporary store the input then update after delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(temp);
    }, 500);

    return () => clearTimeout(timeout);
  }, [temp, search]);

  if (isLoading) {
    return <SixSkeleton />;
  }

  if (error) {
    return <FetchErrorMessage error={error} />;
  }

  return (
    <div className="mt-4 flex w-full flex-col gap-4">
      <div className="mb-4 flex items-center justify-between">
        <Input
          className="w-fit"
          placeholder="filter item.."
          onChange={(e) => setTemp(e.target.value)}
        />
      </div>

      <div className="h-screen">
        {filteredItems ? (
          <>
            <DataTable columns={columns} data={filteredItems} />
            <div className="mt-8 flex items-center justify-between">
              <div className="-mt-6 flex justify-center gap-4 text-sm font-medium text-gray-700">
                <p>Total pages : </p>
                <p>{isTotalPagesLoading ? "Loading..." : totalPages}</p>
                <p className="text-red-700">{totalPagesError && "Failed"}</p>
              </div>

              <TablePagination
                index={index}
                setIndex={setIndex}
                disableNext={isTotalPagesLoading || index === totalPages}
              />
            </div>
          </>
        ) : isSearchLoading ? (
          <SixSkeleton />
        ) : (
          <DataTable columns={columns} data={[]} />
        )}
      </div>
    </div>
  );
}
