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
import AdditionalKeyValue from "../_components/additional-key-value";
import { useRouter } from "next/navigation";
import postAction from "@/actions/post-action";
import { TAGS } from "@/types/tags";

export default function AddProduct() {
  const methods = useForm();
  const [imgUrl, setImgUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isMutating, startTransition] = useTransition();

  const onSubmit = async (formData: ProductType) => {
    if (!imgUrl) {
      toast.error("Please select an image for the product");
      return;
    }

    if (isLoading) {
      return;
    }

    const data = {
      ...formData,
      img: imgUrl,
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
              <div className="flex flex-col items-center">
                <ImageUploader
                  setIsLoading={setIsLoading}
                  setImgUrl={setImgUrl}
                  endpoint="product"
                />
              </div>
            </div>
          </GeneralInformation>
          <AdditionalKeyValue />
          <ButtonGroup isMutating={isMutating} />
        </form>
      </FormProvider>
    </>
  );
}
