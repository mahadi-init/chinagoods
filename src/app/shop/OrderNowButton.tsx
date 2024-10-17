import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";

export default function OrderNowButton({ style }: { style?: string }) {
  return (
    <Button
      variant="secondary"
      className={cn("bg-green-700 p-6 text-xl font-semibold text-white", style)}
      size="lg"
    >
      <ShoppingCart className="mb-1 mr-2.5" />
      অর্ডার করুন
    </Button>
  );
}
