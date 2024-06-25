import Sidenav from "@/components/native/SideNav";
import React from "react";
import Header from "./Header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="p-2">{children}</div>
    </>
  );
}
