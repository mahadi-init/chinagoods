import { sellerOrderColumn } from "@/columns/SellerOrderColumn";
import SellerDashboardPage from "@/components/native/SellerDashboard";
import { Request } from "@/https/request";
import { TAGS } from "@/types/tags";
import SellerOrderUIWrapper from "@/ui/SellerOrderUIWrapper";

export default async function SellerById({
  searchParams,
}: {
  searchParams: {
    id: string;
    name: string;
    page: string;
    limit: string;
    search: string;
    status: string;
    confirm: string;
    filterBy: string;
  };
}) {
  const auth = searchParams.id;
  const name = searchParams.name;

  const req = new Request();
  const dashboard = await req.get(`/seller/orders/dashboard/${auth}`);

  const payload = {
    page: searchParams.page ?? "1",
    limit: searchParams.limit ?? "50",
    search: searchParams.search,
    status: searchParams.status,
    confirm: searchParams.confirm,
    filterBy: searchParams.filterBy ?? "default",
  };

  const { page, limit, filterBy, search, status, confirm } = payload;

  const orders = await req.get(
    `/seller/orders?auth=${auth}&page=${page}&limit=${limit}&filterBy=${filterBy}&search=${search}&status=${status}&confirm=${confirm}`,
    [TAGS.ORDERS],
  );

  return (
    <div>
      <div className="mt-1 flex flex-col gap-1 font-medium">
        <p>Name : {name}</p>
        <p>ID : {auth}</p>
      </div>
      <SellerDashboardPage data={dashboard} />
      {auth && (
        <SellerOrderUIWrapper
          columns={sellerOrderColumn as any}
          data={orders}
          page={page}
        />
      )}
    </div>
  );
}
