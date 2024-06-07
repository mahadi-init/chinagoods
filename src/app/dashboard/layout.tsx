import Sidenav from "@/components/native/SideNav";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidenav />
      <div className="px-4 mt-12 lg:mt-4 lg:ml-72">{children}</div>
    </>
  );
}
