import { Request } from "@/https/request";
import EditSellerPayment from "./ui";
import { TAGS } from "@/types/tags";

export default async function Payment({
  searchParams,
}: {
  searchParams: { id: string; name: string };
}) {
  const data = await new Request().get(`/seller/details/${searchParams.id}`, [
    TAGS.SELLERS,
  ]);

  return (
    <div>
      <EditSellerPayment data={data} id={searchParams.id} />
    </div>
  );
}
