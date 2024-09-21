"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function PhoneSearch({ phone }: { phone?: string }) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = () => {
    const params = new URLSearchParams(searchParams);
    params.set("index", "1");

    params.set("filterBy", "search");
    params.set("search", phone as string);

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <a className="cursor-pointer font-bold" onClick={handleNavigation}>
      {phone}
    </a>
  );
}
