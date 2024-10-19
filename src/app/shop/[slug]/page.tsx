import { Request } from "@/https/request";
import ProductDeatils from "./ui";
import { TAGS } from "@/types/tags";
import { ProductType } from "@/types/product.t";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const data: ProductType[] = await new Request().get(
    `/product/get/slug/${params.slug}`,
    [TAGS.PRODUCTS],
  );

  return {
    title: data[0].name,
    openGraph: {
      title: data[0].name,
      description: data[0].description ?? (await parent).description ?? "",
      type: "website",
      images: {
        url: data[0].img as string,
        width: 800,
        height: 600,
        alt: "TexBazar LTD",
      },
    },
    description: data[0].description ?? (await parent).description,
  };
}

export default async function Product({
  params,
}: {
  params: { slug: string };
}) {
  const data: ProductType[] = await new Request().get(
    `/product/get/slug/${params.slug}`,
    [TAGS.PRODUCTS],
  );

  return <ProductDeatils data={data[0]} />;
}
