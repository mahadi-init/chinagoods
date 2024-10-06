import { orderColumn } from "@/columns/OrderColumn";
import DashboardOverview from "@/components/native/DashboardOverview";
import PageTop from "@/components/native/PageTop";
import { Request } from "@/https/request";
import { TAGS } from "@/types/tags";
import OrderUIWrapper from "@/ui/OrderUIWrapper";
import React from "react";

export default async function Orders() {
  const req = new Request();
  const dashboard = await req.get("/order/overview", [TAGS.DASHBOARD]);
  const orders = await req.get(
    "/order/page?page=1&limit=100&filterBy=confirm&confirm=NO_HOLD",
    [TAGS.ORDERS],
  );

  return (
    <div>
      <PageTop title="Dashboard" showSubTitle={false} />
      <DashboardOverview data={dashboard} />

      <div className="mt-16">
        <p className="text-center text-2xl font-bold">
          Mini Order <span className="text-yellow-600">(NO & HOLD)</span>
        </p>
        <OrderUIWrapper
          showTop={false}
          route="/order"
          columns={orderColumn as any}
          data={orders}
          page="1"
          showBottom={false}
        />
      </div>
    </div>
  );
}
