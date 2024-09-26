import { sellerColumn } from "@/columns/SellerColumn";
import PageTop from "@/components/native/PageTop";
import { Request } from "@/https/request";
import SellerUIWrapper from "@/ui/SellerUIWrapper";

export default async function Sellers() {
  const sellers = await new Request().get(`/seller/page?page=1&limit=50`);

  return (
    <div>
      <PageTop title="Sellers" />
      <SellerUIWrapper columns={sellerColumn} data={sellers} />
    </div>
  );
}
