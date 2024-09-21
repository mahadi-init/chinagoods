"use client";

import { orderColumn } from "@/columns/OrderColumn";
import PageTop from "@/components/native/PageTop";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetcher } from "@/https/get-request";
import { SellerDashboard } from "@/types/seller-dashboard";
import OrderUIWrapper from "@/ui/OrderUIWrapper";
import React from "react";
import useSWR from "swr";

interface Dashboard extends SellerDashboard {}

export default function Orders() {
  const { data, isLoading } = useSWR<Dashboard>("/order/overview", fetcher, {
    refreshInterval: 1000,
  });

  return (
    <div>
      <PageTop title="Dashboard" showSubTitle={false} />
      <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <Card className="w-[350px] bg-sky-700 text-white">
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
            <CardDescription className="font-semibold text-white">
              {data?.totalOrders} {data?.totalOrders === 1 ? "Order" : "Orders"}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="w-[350px] bg-yellow-700 text-white">
          <CardHeader>
            <CardTitle>Total Pending</CardTitle>
            <CardDescription className="font-semibold text-white">
              {data?.totalPending}{" "}
              {data?.totalPending === 1 ? "Order" : "Orders"}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="w-[350px] bg-red-700 text-white">
          <CardHeader>
            <CardTitle>Total cancelled</CardTitle>
            <CardDescription className="font-semibold text-white">
              {data?.totalCancelled}{" "}
              {data?.totalCancelled === 1 ? "Order" : "Orders"}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="w-[350px] bg-green-700 text-white">
          <CardHeader>
            <CardTitle>Total Delivered</CardTitle>
            <CardDescription className="font-semibold text-white">
              {data?.totalDelivered}{" "}
              {data?.totalDelivered === 1 ? "Order" : "Orders"}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="w-[350px] bg-sky-700 text-white">
          <CardHeader>
            <CardTitle>Monthly Total</CardTitle>
            <CardDescription className="font-semibold text-white">
              {data?.thisMonthTotal}{" "}
              {data?.thisMonthTotal === 1 ? "Order" : "Orders"}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="w-[350px] bg-yellow-700 text-white">
          <CardHeader>
            <CardTitle>Monthly Pending</CardTitle>
            <CardDescription className="font-semibold text-white">
              {data?.thisMonthPending}{" "}
              {data?.thisMonthPending === 1 ? "Order" : "Orders"}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="w-[350px] bg-red-700 text-white">
          <CardHeader>
            <CardTitle>Monthly Cancelled</CardTitle>
            <CardDescription className="font-semibold text-white">
              {data?.thisMonthCancelled}{" "}
              {data?.thisMonthCancelled === 1 ? "Order" : "Orders"}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="w-[350px] bg-green-700 text-white">
          <CardHeader>
            <CardTitle>Monthly Delivered</CardTitle>
            <CardDescription className="font-semibold text-white">
              {data?.thisMonthDelivered}{" "}
              {data?.thisMonthDelivered === 1 ? "Order" : "Orders"}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="mt-8">
        <p className="text-center text-2xl font-bold">
          Mini Order (Only NO Will be shown by default)
        </p>
        <OrderUIWrapper
          route="/order"
          columns={orderColumn as any}
          confirmValue="NO"
          statusValue="WAITING"
        />
      </div>
    </div>
  );
}
