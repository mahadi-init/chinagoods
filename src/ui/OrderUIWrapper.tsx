"use client";
import { DataTable } from "@/components/native/DataTable";
import FetchErrorMessage from "@/components/native/FetchErrorMessage";
import SixSkeleton from "@/components/native/SixSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/https/get-request";
import { ColumnDef } from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

interface TableUIWrapperProps<T> {
  route: string;
  columns: ColumnDef<T, unknown>[];
  confirmValue?: string | null;
}

export default function OrderUIWrapper<
  T extends { status?: string; confirm?: boolean },
>({ route, columns, confirmValue }: TableUIWrapperProps<T>) {
  const [temp, setTemp] = useState<string>();
  const { replace } = useRouter();
  const pathname = usePathname();

  // using search params
  const searchParams = useSearchParams();
  const index = searchParams.get("index") ?? "1";
  const limit = searchParams.get("limit") ?? "25";
  const search = searchParams.get("search");
  const status = searchParams.get("status") ?? "WAITING";
  const confirm = searchParams.get("confirm") ?? confirmValue;
  const filterBy = searchParams.get("filterBy") ?? "default";

  // data fetching
  const { data, error, isLoading } = useSWR<T[]>(
    `${route}/page?page=${index}&limit=${limit}&filterBy=${filterBy}&search=${search}&status=${status}&confirm=${confirm}`,
    fetcher,
  );

  // run when search value is empty
  useEffect(() => {
    if (!temp && filterBy === "search") {
      const params = new URLSearchParams(searchParams);

      params.delete("search");
      params.set("filterBy", "default");
      replace(`${pathname}?${params.toString()}`);
    }
  }, [filterBy, pathname, replace, searchParams, temp]);

  if (isLoading) {
    return <SixSkeleton />;
  }

  if (error) {
    return <FetchErrorMessage error={error} />;
  }

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const params = new URLSearchParams(searchParams);

      if (temp) {
        params.set("filterBy", "search");
        params.set("search", temp.trim() as string);
      } else {
        params.delete("search");
      }
      replace(`${pathname}?${params.toString()}`);
    }
  };

  const handleStatus = (status: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("filterBy", "status");
    params.set("status", status as string);

    replace(`${pathname}?${params.toString()}`);
  };

  const handleConfirm = (confirm: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("filterBy", "confirm");
    params.set("confirm", confirm as string);

    replace(`${pathname}?${params.toString()}`);
  };

  const handleLimit = (limit: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("limit", limit as string);
    replace(`${pathname}?${params.toString()}`);
  };

  const handlePagination = (index: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("index", index.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-4 flex w-full flex-col gap-4">
      <div className="mb-4 flex items-center justify-between">
        <Input
          className="w-fit"
          placeholder="filter item.."
          autoFocus
          onChange={(e) => setTemp(e.target.value)}
          onKeyDown={(e) => handleSearch(e)}
          defaultValue={search as string}
        />

        <div className="flex gap-2">
          <div className="flex gap-2">
            <select
              onChange={(e) => handleConfirm(e.target.value)}
              className="mt-0.5 rounded-md bg-gray-100 p-2"
              defaultValue={confirm as string}
            >
              <option value="ALL">All</option>
              <option className="text-green-600" value="OK">
                OK
              </option>
              <option className="text-red-600" value="NO">
                NO
              </option>
            </select>
          </div>

          <div className="flex gap-2">
            <select
              onChange={(e) => handleStatus(e.target.value)}
              className="mt-0.5 rounded-md bg-gray-100 p-2"
              defaultValue={status}
            >
              <option value="ALL">ALL</option>
              <option className="text-sky-600" value="WAITING">
                WAITING
              </option>
              <option className="text-yellow-700" value="PROCESSING">
                PROCESSING
              </option>
              <option className="text-green-600" value="DELIVERED">
                DELIVERED
              </option>
              <option className="text-red-600" value="CANCELLED">
                CANCELLED
              </option>
            </select>
          </div>
        </div>
      </div>

      <div className="h-screen">
        {data ? (
          <>
            <DataTable columns={columns} data={data} />
            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                <select
                  onChange={(e) => handleLimit(e.target.value)}
                  className="mt-0.5 rounded-md bg-gray-100 p-2"
                  defaultValue={limit}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="35">35</option>
                  <option value="50">50</option>
                </select>
              </div>

              <div className="mb-4 flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    let i = parseInt(index);

                    if (i === 1) {
                      return;
                    }

                    handlePagination(--i);
                  }}
                >
                  Prev
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    let i = parseInt(index);
                    handlePagination(++i);
                  }}
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        ) : isLoading ? (
          <SixSkeleton />
        ) : (
          <DataTable columns={columns} data={[]} />
        )}
      </div>
    </div>
  );
}
