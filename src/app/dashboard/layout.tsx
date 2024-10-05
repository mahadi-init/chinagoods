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
      <div className="mt-12 lg:ml-48 lg:mt-4">{children}</div>
    </>
  );
}
