import { ChipInput } from "@/components/native/ChipInput";
import LoadingSkeleton from "@/components/native/LoadingSkeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetcher } from "@/https/get-request";
import { XIcon } from "@/icons/Xicon";
import { CategoryType } from "@/types/category.t";
import { ProductType } from "@/types/product.t";
import { useFormContext } from "react-hook-form";
import useSWR from "swr";

export function ProductCategory({
  category,
  setCategory,
  childrens,
  setSelectedChildrens,
  tags,
  setTags,
  isFeatured,
}: {
  category?: string;
  setCategory: (arg0?: string) => void;
  childrens: string[];
  setSelectedChildrens: (arg0: string[]) => void;
  tags: string[];
  setTags: (arg0: string[]) => void;
  isFeatured?: boolean;
}) {
  const {
    data: categories,
    error,
    isLoading,
  } = useSWR<CategoryType[]>(`/category/all`, fetcher);
  const { register } = useFormContext<ProductType>();

  if (isLoading) {
    return (
      <div className="my-4">
        <p className="block mb-1 text-xl font-medium">Product Category</p>
        <div className="flex flex-col gap-2">
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-4">
        <p className="block mb-1 text-xl font-medium">Product Category</p>
        <p className="italic text-red-600">Something went wrong</p>
      </div>
    );
  }

  return (
    <>
      <div className="my-4">
        <p className="block mb-1 text-xl font-medium">
          Product Category <span className="text-red-600">*</span>
        </p>

        <div className="flex flex-wrap gap-2">
          {category && (
            <Badge
              variant="secondary"
              className="flex items-center"
              onClick={() => setCategory(undefined)}
            >
              {category} <XIcon className="ml-1" />
            </Badge>
          )}
          {childrens.map((category, index) => {
            return (
              <Badge
                key={index}
                variant="secondary"
                className="flex items-center"
                onClick={() => {
                  setSelectedChildrens(childrens.filter((_, i) => i !== index));
                }}
              >
                {category} <XIcon className="ml-1" />
              </Badge>
            );
          })}
        </div>
      </div>

      <ScrollArea className="w-full bg-white border rounded-md h-72 border-slate-200 dark:border-slate-800">
        <Accordion type="multiple" className="w-full px-2">
          {categories?.map((category, index) => {
            return (
              <AccordionItem key={index} value={category.name as string}>
                <AccordionTrigger
                  onClick={() => setCategory(category.name as string)}
                >
                  {category.name}
                </AccordionTrigger>
                {category?.children?.map((item, index) => {
                  return (
                    <AccordionContent
                      key={index}
                      className="cursor-pointer"
                      onClick={() => {
                        if (!childrens.includes(item)) {
                          setSelectedChildrens([...childrens, item]);
                        }
                      }}
                    >
                      {item}
                    </AccordionContent>
                  );
                })}
              </AccordionItem>
            );
          })}
        </Accordion>
      </ScrollArea>

      <ChipInput
        label="Tags"
        items={tags}
        setItems={setTags}
        style="bg-white"
      />

      <div>
        <Label className="w-fit flex items-center gap-5">
          <span className="block mb-1 text-sm font-medium mt-1">
            Set as Featured
          </span>
          <Input
            className="w-5"
            defaultChecked={isFeatured}
            type="checkbox"
            {...register("featured")}
          />
        </Label>
      </div>
    </>
  );
}
