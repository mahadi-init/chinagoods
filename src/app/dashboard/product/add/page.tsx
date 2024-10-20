"use client";
import { Breadcrumbs } from "@/components/native/Breadcrumbs";
import ButtonGroup from "@/components/native/ButtonGroup";
import { ImageUploader } from "@/components/native/ImageUploader";
import PageTop from "@/components/native/PageTop";
import { ProductType } from "@/types/product.t";
import { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import GeneralInformation from "../_components/general-information";
import { useRouter } from "next/navigation";
import postAction from "@/actions/post-action";
import { TAGS } from "@/types/tags";
import WhyBuy from "../_components/WhyBuy";
import { parseTextAreaInput } from "@/utils/parse-input";

export default function AddProduct() {
  const methods = useForm();
  const [images, setImages] = useState<string[]>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isMutating, startTransition] = useTransition();

  const onSubmit = async (formData: ProductType) => {
    if (!images || !images[0]) {
      toast.error("Selecting first image is mandatory");
      return;
    }

    if (isLoading) {
      toast.info("Wait for image upload to complete");
      return;
    }

    // @ts-expect-error
    const reasons = parseTextAreaInput(formData.whyBuyReasons);

    const data = {
      ...formData,
      img: images[0],
      images: images,
      whyBuyReasons: reasons,
    };

    startTransition(async () => {
      const res = await postAction(`/product/add`, data, [TAGS.PRODUCTS]);

      if (res) {
        toast.success("Product successfully added");
        router.push("/dashboard/product");
      } else {
        toast.error("Failed adding product");
      }
    });
  };

  const handleImages = (index: number, img?: string) => {
    if (!img) {
      return;
    }

    setImages((prevImages) => {
      const newImages = [...(prevImages ?? [])];
      newImages[index] = img;
      return newImages;
    });
  };

  return (
    <>
      <PageTop title="Add Product" showSubTitle={false} />
      <Breadcrumbs
        props={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Products", link: "/dashboard/products" },
        ]}
      />

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="mb-4 mt-4 flex w-full flex-col gap-4"
        >
          <GeneralInformation>
            <div className="flex flex-col justify-evenly pb-2 xl:flex-row xl:items-center">
              <div className="flex flex-col flex-wrap items-center justify-between gap-16 md:flex-row">
                <ImageUploader
                  setIsLoading={setIsLoading}
                  setImgUrl={(img) => handleImages(0, img)}
                  endpoint="product"
                />

                <ImageUploader
                  setIsLoading={setIsLoading}
                  setImgUrl={(img) => handleImages(1, img)}
                  endpoint="product"
                />

                <ImageUploader
                  setIsLoading={setIsLoading}
                  setImgUrl={(img) => handleImages(2, img)}
                  endpoint="product"
                />

                <ImageUploader
                  setIsLoading={setIsLoading}
                  setImgUrl={(img) => handleImages(3, img)}
                  endpoint="product"
                />
              </div>
            </div>
          </GeneralInformation>

          <WhyBuy />

          <div className="p-2">
            <ButtonGroup isMutating={isMutating} />
          </div>
        </form>
      </FormProvider>
    </>
  );
}
