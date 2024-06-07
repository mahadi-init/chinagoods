"use client";
import { reviewColumn } from "@/columns/ReviewColumn";
import { DataTable } from "@/components/native/DataTable";
import FetchErrorMessage from "@/components/native/FetchErrorMessage";
import PageTop from "@/components/native/PageTop";
import { fetcher } from "@/https/get-request";
import { ReviewType } from "@/types/review.t";
import useSWR from "swr";

export default function Reviews() {
  const { data, error } = useSWR<ReviewType[]>("/review/all", fetcher);

  if (error) {
    return <FetchErrorMessage error={error} />;
  }

  return (
    <>
      <PageTop title="Reviews" />
      <div className="mt-4">
        {data ? (
          <DataTable columns={reviewColumn} data={data} />
        ) : (
          <DataTable columns={reviewColumn} data={[]} />
        )}
      </div>
    </>
  );
}
