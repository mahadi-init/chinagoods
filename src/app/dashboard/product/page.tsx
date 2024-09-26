import { productColumn } from "@/columns/ProductColumn";
import PageTop from "@/components/native/PageTop";
import { Request } from "@/https/request";
import ProductUiWrapper from "@/ui/ProductUIWrapper";

export default async function Products({
  searchParams,
}: {
  searchParams: {
    limit: string;
    page: string;
    search: string;
  };
}) {
  const { search, limit, page } = {
    page: searchParams.page ?? "1",
    limit: searchParams.limit ?? "50",
    search: searchParams.search,
  };

  const products = await new Request().get(
    `/product/page?page=${page}&limit=${limit}&search=${search}`,
  );

  return (
    <>
      <PageTop title="Products" />
      <ProductUiWrapper columns={productColumn} data={products} />
    </>
  );
}
