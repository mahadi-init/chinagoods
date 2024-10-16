import { sellerOrderColumn } from "@/columns/SellerOrderColumn";
import PageTop from "@/components/native/PageTop";
import { Request } from "@/https/request";
import { TAGS } from "@/types/tags";
import SellerOrderUIWrapper from "@/ui/SellerOrderUIWrapper";
import { getLastSixDigit } from "@/utils/get-last-six-digit";
import { cookies } from "next/headers";
import { Suspense } from "react";

export default async function Seller({
  searchParams,
}: {
  searchParams: {
    page: string;
    limit: string;
    filterBy: string;
    search: string;
    status: string;
    confirm: string;
  };
}) {
  const auth = cookies().get("authId")?.value;
  const name = cookies().get("authName")?.value;

  const { page, limit, filterBy, search, status, confirm } = {
    page: searchParams.page ?? "1",
    limit: searchParams.limit ?? "25",
    filterBy: searchParams.filterBy ?? "default",
    search: searchParams.search,
    status: searchParams.status,
    confirm: searchParams.confirm,
  };

  const data = await new Request().get(
    `/seller/orders/?auth=${auth}&page=${page}&limit=${limit}&filterBy=${filterBy}&search=${search}&status=${status}&confirm=${confirm}`,
    [TAGS.ORDERS],
  );

  return (
    <div>
      <PageTop
        title={`Profile : ${name} - #${getLastSixDigit(auth)}`}
        showSubTitle={false}
      />

      {auth && (
        <Suspense fallback={null}>
          <SellerOrderUIWrapper
            page={page}
            columns={sellerOrderColumn as any}
            data={data}
          />
        </Suspense>
      )}
    </div>
  );
}
