import { productColumn } from "@/columns/ProductColumn";
import PageTop from "@/components/native/PageTop";
import ProductUiWrapper from "@/ui/ProductUIWrapper";

export default function Products() {
  return (
    <>
      <PageTop title="Products" />
      <ProductUiWrapper route="/product" columns={productColumn} />
    </>
  );
}
