import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

export function ImagepopOver({ img }: { img: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Image
          className="w-12 rounded-md"
          width={500}
          height={500}
          src={img}
          alt="cell image"
          loading="lazy"
        />
      </PopoverTrigger>
      <PopoverContent className="w-[350px] rounded-lg">
        <Image src={img} width={1920} height={1080} alt="product" />
      </PopoverContent>
    </Popover>
  );
}