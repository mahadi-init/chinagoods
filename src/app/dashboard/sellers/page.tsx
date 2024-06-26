import { sellerColumn } from "@/columns/SellerColumn";
import PageTop from "@/components/native/PageTop";
import SellerUIWrapper from "@/ui/SellerUIWrapper";

export default function Sellers() {
  return (
    <div>
      <PageTop title="Sellers" />
      <SellerUIWrapper route="/seller" columns={sellerColumn} />
    </div>
  );
}
