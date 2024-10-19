import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function OrderNowButton({ style }: { style?: string }) {
  return (
    <Link
      href="#order"
      className={cn(
        "!bg-green-700 !p-6 !text-lg !text-white",
        buttonVariants({ variant: "secondary", size: "lg" }),
        style,
      )}
    >
      <ShoppingCart className="mb-1 mr-2.5" />
      অর্ডার করুন
    </Link>
  );
}
