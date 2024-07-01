"use client";

import { sellerOrderColumn } from "@/columns/SellerOrderColumn";
import PageTop from "@/components/native/PageTop";
import SellerOrderUIWrapper from "@/ui/SellerOrderUIWrapper";
import { getLastSixDigit } from "@/utils/get-last-six-digit";
import { useEffect, useState } from "react";

export default function Seller() {
  const [auth, setAuth] = useState<string>();
  const [authName, setAuthName] = useState<string>();

  useEffect(() => {
    setAuth(localStorage.getItem("authId") as string);
    setAuthName(localStorage.getItem("authName") as string);
  }, []);

  return (
    <div>
      <PageTop
        title={`Profile : ${authName} - #${getLastSixDigit(auth)}`}
        showSubTitle={false}
      />

      {auth && (
        <SellerOrderUIWrapper
          auth={auth}
          route={`/seller/orders?auth=${auth}`}
          columns={sellerOrderColumn as any}
        />
      )}
    </div>
  );
}
