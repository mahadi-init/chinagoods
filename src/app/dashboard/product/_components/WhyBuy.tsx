import { Textarea } from "@/components/ui/textarea";
import { ProductSchema, ProductType } from "@/types/product.t";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

const WhyBuySchema = ProductSchema.pick({
  whyBuy: true,
  whyBuyReasons: true,
});
type WhyBuyType = z.infer<typeof WhyBuySchema>;

export default function WhyBuy({ data }: { data?: WhyBuyType }) {
  const { register } = useFormContext<ProductType>();

  return (
    <div className="flex flex-col gap-6 rounded-lg bg-gray-100 p-6 shadow">
      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="why">
          Why Buy from us
        </label>
        <Textarea
          rows={4}
          id="why"
          defaultValue={data?.whyBuy}
          placeholder="Write the reason"
          {...register("whyBuy")}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="reasons">
          Buying Reasons
        </label>
        <Textarea
          rows={12}
          id="reasons"
          defaultValue={data?.whyBuyReasons?.toString()}
          placeholder={`the product is good
very nice product
comfortable to use
            `}
          {...register("whyBuyReasons")}
        />
      </div>
    </div>
  );
}
