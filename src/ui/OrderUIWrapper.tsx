"use client";
import { DataTable } from "@/components/native/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useStatus from "@/hooks/useStatus";
import updateRequest from "@/https/update-request";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { RefreshCwIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import useSWRMutation from "swr/mutation";
import { useDebouncedCallback } from "use-debounce";

interface TableUIWrapperProps<T> {
  route: string;
  columns: ColumnDef<T, unknown>[];
  confirm?: string;
  status?: string;
  search?: string;
  limit?: string;
  data: any;
  page: string;
  showTop?: boolean;
  showBottom?: boolean;
}

export default function OrderUIWrapper<
  T extends { status?: string; confirm?: boolean },
>({
  route,
  columns,
  data,
  confirm,
  status,
  search,
  limit,
  page,
  showTop = true,
  showBottom = true,
}: TableUIWrapperProps<T>) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const { showStatus } = useStatus();
  const searchParams = useSearchParams();

  const { trigger, isMutating } = useSWRMutation(
    `${route}/refresh`,
    updateRequest,
  );

  const handleSearch = useDebouncedCallback((search) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (search || search === "") {
      params.set("filterBy", "search");
      params.set("search", search.trim() as string);
    } else {
      params.delete("search");
      params.set("filterBy", "default");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleStatus = (status: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", "1");
    params.set("filterBy", "status");
    params.set("status", status as string);

    replace(`${pathname}?${params.toString()}`);
  };

  const handleConfirm = (confirm: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", "1");
    params.set("filterBy", "confirm");
    params.set("confirm", confirm as string);

    replace(`${pathname}?${params.toString()}`);
  };

  const handleLimit = (limit: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("limit", limit as string);
    replace(`${pathname}?${params.toString()}`);
  };

  const handlePagination = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", page.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const refreshDataInfo = async () => {
    const res = await trigger({});
    showStatus("/order", "Data refreshed successfully", res);
  };

  return (
    <div className="mt-4 flex w-full flex-col gap-4">
      {showTop && (
        <div className="mb-4 flex items-center justify-between">
          <Input
            className="w-fit"
            placeholder="filter item.."
            onChange={(e) => handleSearch(e.target.value)}
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
                <option className="text-yellow-600" value="HOLD">
                  HOLD
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
                defaultValue={status as string}
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

            <Button
              onClick={refreshDataInfo}
              variant="outline"
              disabled={isMutating}
            >
              <div className={clsx(isMutating && "animate-spin")}>
                <RefreshCwIcon size={18} />
              </div>
            </Button>
          </div>
        </div>
      )}

      <div className="h-screen">
        <DataTable columns={columns} data={data} />
        {showBottom && (
          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2">
              <select
                onChange={(e) => handleLimit(e.target.value)}
                className="mt-0.5 rounded-md bg-gray-100 p-2"
                defaultValue={limit}
              >
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>

            <div className="mb-4 flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  let i = parseInt(page);

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
                  let i = parseInt(page);
                  handlePagination(++i);
                }}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
