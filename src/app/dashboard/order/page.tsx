import { orderColumn } from "@/columns/OrderColumn";
import PageTop from "@/components/native/PageTop";
import { Request } from "@/https/request";
import { TAGS } from "@/types/tags";
import OrderUIWrapper from "@/ui/OrderUIWrapper";

type OrderparmasType = {
  page: string;
  limit: string;
  search: string;
  status: string;
  confirm: string;
  filterBy: string;
};

export default async function Orders({
  searchParams,
}: {
  searchParams: OrderparmasType;
}) {
  const payload = {
    page: searchParams.page ?? "1",
    limit: searchParams.limit ?? "50",
    search: searchParams.search,
    status: searchParams.status,
    confirm: searchParams.confirm,
    filterBy: searchParams.filterBy ?? "default",
  };
  const { page, limit, search, status, confirm, filterBy } = payload;
  const data = await new Request().get(
    `/order/page?page=${page}&limit=${limit}&filterBy=${filterBy}&search=${search}&status=${status}&confirm=${confirm}`,
    [TAGS.ORDERS],
  );

  return (
    <div className="p-2">
      <PageTop title="Orders (All Orders)" showSubTitle={false} />
      <OrderUIWrapper
        route="/order"
        limit={limit}
        search={search}
        page={page}
        status={status}
        confirm={confirm}
        columns={orderColumn as any}
        data={data}
      />
    </div>
  );
}
