"use client";
import { DataTable } from "@/components/native/DataTable";
import FetchErrorMessage from "@/components/native/FetchErrorMessage";
import SixSkeleton from "@/components/native/SixSkeleton";
import TablePagination from "@/components/native/TablePagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/https/get-request";
import { ColumnDef } from "@tanstack/react-table";
import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface TableUIWrapperProps<T> {
  route: string;
  columns: ColumnDef<T, unknown>[];
}

export default function TableUIWrapper<T extends { status?: boolean }>({
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
    fetcher
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
    fetcher
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

  // filter by dropdown
  const handleDropdown = (status: string) => {
    if (status === "ALL") {
      setFilteredItems(data);
    } else {
      const temp = status === "ACTIVE" ? true : false;
      setFilteredItems(data?.filter((item) => item.status === temp));
    }
  };

  return (
    <div className="w-full mt-4 flex flex-col gap-4 ">
      <div className="mb-4 flex items-center justify-between ">
        <Input
          className="w-fit"
          placeholder="filter item.."
          onChange={(e) => setTemp(e.target.value)}
        />
        <div className="flex gap-2">
          <select
            onChange={(e) => handleDropdown(e.target.value)}
            className="mt-0.5 p-2 bg-gray-100 rounded-md"
          >
            <option value="ALL">ALL</option>
            <option className="text-green-600" value="ACTIVE">
              ACTIVE
            </option>
            <option className="text-red-500" value="INACTIVE">
              INACTIVE
            </option>
          </select>
          <Button
            variant="outline"
            onClick={() => {
              mutate();
            }}
          >
            <RefreshCcw />
          </Button>
        </div>
      </div>

      <div className="h-screen">
        {filteredItems ? (
          <>
            <DataTable columns={columns} data={filteredItems} />
            <div className="mt-8 flex items-center justify-between">
              <div className="-mt-6 text-gray-700 font-medium text-sm flex justify-center gap-4">
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
