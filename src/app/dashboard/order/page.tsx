import { orderColumn } from "@/columns/OrderColumn";
import PageTop from "@/components/native/PageTop";
import OrderUIWrapper from "@/ui/OrderUIWrapper";

export default async function Orders() {
  return (
    <>
      <PageTop title="Orders (All Orders)" showSubTitle={false} />
      <OrderUIWrapper route="/order" columns={orderColumn as any} />
    </>
  );
}
