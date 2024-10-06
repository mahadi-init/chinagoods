"use client";
import ChangeConfirmationStatus from "@/components/native/ChangeConfirmStatus";
import DeleteItem from "@/components/native/DeleteItem";
import { HoverToolkit } from "@/components/native/HoverToolkit";
import OrderConfirmationDialog from "@/components/native/OrderConfirmationDialog";
import { OrderType } from "@/types/order.t";
import { getLastSixDigit } from "@/utils/get-last-six-digit";
import { ColumnDef } from "@tanstack/react-table";
import { PenIcon, ReceiptText, Send } from "lucide-react";
import Link from "next/link";
import ChangeOrderStatus from "@/components/native/ChangeOrderStatus";
import { MultipleHoverToolkit } from "@/components/native/MutipleHoverToolkit";
import PhoneSearch from "@/components/phone-search";
import { TAGS } from "@/types/tags";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "sonner";

export const orderColumn: ColumnDef<OrderType>[] = [
  {
    accessorKey: "confirmation",
    header: "CONFIRM",
    cell: ({ row }) => {
      return (
        <ChangeConfirmationStatus
          id={row.original._id}
          confirm={row.original.confirm}
        />
      );
    },
  },
  {
    accessorKey: "duplicate",
    header: "DUP",
    cell: ({ row }) => {
      return (
        <p className="font-bold text-red-900">
          {row.original.duplicate && "YES"}
        </p>
      );
    },
  },
  {
    accessorKey: "sku",
    header: "SKU",
    cell: ({ row }) => {
      return (
        <Link
          href={`/dashboard/order/details/${row.original._id}`}
          className="cursor-pointer font-medium underline"
        >
          {row.original.cart?.map((item) => item.sku).join(" & ")}
        </Link>
      );
    },
  },
  {
    accessorKey: "orderBy",
    header: "SELLER",
    cell: ({ row }) => {
      return (
        <Link
          href={`/dashboard/sellers/profile?id=${row.original.sellerId}&name=${row.original.sellerName}`}
          className="cursor-pointer font-medium underline"
        >
          {row.original.sellerName}
        </Link>
      );
    },
  },
  {
    accessorKey: "name",
    header: "NAME",
    cell: ({ row }) => {
      return (
        <MultipleHoverToolkit
          content={
            <div>
              <p>{row.original.address}</p>
              <p>{row.original.note}</p>
            </div>
          }
        >
          <p>{row.original.name}</p>
        </MultipleHoverToolkit>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "PHONE",
    cell: ({ row }) => {
      return <PhoneSearch phone={row.original.phone} />;
    },
  },
  {
    accessorKey: "total",
    header: "TOTAL",
    cell: ({ row }) => {
      return <p className="font-medium">৳ {row.original.total}</p>;
    },
  },
  {
    accessorKey: "Date",
    header: "DATE",
    cell: ({ row }) => {
      return (
        <div>
          <p>
            {/* @ts-expect-error */}
            {new Date(row.original.createdAt).toLocaleDateString("en-GB")}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "trackingLink",
    header: "TRACKING",
    cell: ({ row }) => {
      return (
        row.original.trackingLink && (
          <Link
            href={row.original.trackingLink}
            className="font-medium text-blue-700"
            target="_blank"
          >
            Visit
          </Link>
        )
      );
    },
  },
  {
    accessorKey: "consignmentId",
    header: "CONSIGNMENT",
    cell: ({ row }) => {
      return (
        row.original.consignmentId && (
          <div className="cursor-copy">
            <CopyToClipboard
              text={row.original.consignmentId}
              onCopy={() => toast.info("Copied to clipboard")}
            >
              <p>{row.original.consignmentId}</p>
            </CopyToClipboard>{" "}
          </div>
        )
      );
    },
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      let color;

      switch (row.original.status) {
        case "WAITING":
          color = "text-sky-600";
          break;

        case "IN_REVIEW":
          color = "text-yellow-600";
          break;

        case "DELIVERED":
          // case "PARTIAL_DELIVERED":
          color = "text-green-600";
          break;

        case "CANCELLED":
          // case "HOLD":
          color = "text-red-600";
          break;

        default:
          color = "text-purple-600";
      }

      return (
        <ChangeOrderStatus
          id={row.original._id}
          status={row.original.status}
          color={color}
        />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex justify-end gap-8">
        {row.original.status === "WAITING" && (
          <OrderConfirmationDialog
            alertText={`# ${getLastSixDigit(row.original._id)} will be sent to courir`}
            data={row.original}
          >
            <Send size={18} className="cursor-pointer" />
          </OrderConfirmationDialog>
        )}
        <HoverToolkit text="Edit">
          <Link href={`/dashboard/order/edit/${row.original._id}`}>
            <PenIcon size={18} />
          </Link>
        </HoverToolkit>
        <HoverToolkit text="Invoice">
          <Link href={`/dashboard/order/invoice/${row.original._id}`}>
            <ReceiptText size={18} />
          </Link>
        </HoverToolkit>
        <DeleteItem
          queryUrl={`/order/delete/${row.original._id}`}
          validationTag={TAGS.ORDERS}
        />
      </div>
    ),
  },
];