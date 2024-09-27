import { sellerColumn } from "@/columns/SellerColumn";
import PageTop from "@/components/native/PageTop";
import { Request } from "@/https/request";
import { TAGS } from "@/types/tags";
import SellerUIWrapper from "@/ui/SellerUIWrapper";

export default async function Sellers() {
  const sellers = await new Request().get(`/seller/page?page=1&limit=50`, [
    TAGS.SELLERS,
  ]);

  return (
    <div>
      <PageTop title="Sellers" />
      <SellerUIWrapper columns={sellerColumn} data={sellers} />
    </div>
  );
}
