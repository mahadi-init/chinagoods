import { Request } from "@/https/request";
import ProductDeatils from "./ui";
import { TAGS } from "@/types/tags";
import { ProductType } from "@/types/product.t";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const data: ProductType = await new Request().get(
    `/product/get/${params.id}`,
    [TAGS.PRODUCTS],
  );

  return {
    title: data.name,
    openGraph: {
      title: data.name,
      description: data.description ?? (await parent).description ?? "",
      type: "website",
      images: {
        url: data.img as string,
        width: 800,
        height: 600,
        alt: "TexBazar LTD",
      },
    },
    description: data.description ?? (await parent).description,
  };
}

export default async function Product({ params }: { params: { id: string } }) {
  const data: ProductType = await new Request().get(
    `/product/get/${params.id}`,
    [TAGS.PRODUCTS],
  );

  return <ProductDeatils data={data} />;
}
