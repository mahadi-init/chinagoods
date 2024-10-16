"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  firstChild?: React.ReactNode;
  lastChild?: React.ReactNode;
  columnVisibilityToken?: string;
  showTop?: boolean;
}

const color = (
  status?: "WAITING" | "CANCELLED" | "DELIVERED",
  duplicate?: boolean,
) => {
  if (!status) {
    return;
  }

  if (duplicate) {
    return "!text-red-900 font-semibold bg-red-300";
  }

  switch (status) {
    case "WAITING":
      return "!text-black";
    case "DELIVERED":
      return "!text-green-900 font-semibold bg-green-100";
    case "CANCELLED":
      return "!text-red-900 font-semibold bg-red-100";
    default:
      return "!text-purple-900 font-semibold bg-purple-100";
  }
};

export function DataTable<TData, TValue>({
  columns,
  data,
  firstChild,
  lastChild,
  columnVisibilityToken,
  showTop = true,
}: DataTableProps<TData, TValue>): JSX.Element {
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    if (!columnVisibilityToken) {
      return;
    }

    if (isFirstTime) {
      const item = localStorage.getItem(columnVisibilityToken);

      if (item) {
        const data = JSON.parse(item);
        setColumnVisibility(data);
      }

      setIsFirstTime(false);
    } else {
      localStorage.setItem(
        columnVisibilityToken,
        JSON.stringify(columnVisibility),
      );
    }
  }, [columnVisibility, columnVisibilityToken, isFirstTime]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  //DATE: OCT 17
  console.log(rowSelection);

  return (
    <div className="w-full">
      {showTop && (
        <div className="flex w-full items-center justify-between p-2">
          {firstChild}
          <div className="flex items-center gap-4">
            {columnVisibilityToken && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Columns <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) => {
                            column.toggleVisibility(!!value);
                          }}
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {lastChild}
          </div>
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={color(
                        cell.row.getValue("status"),
                        cell.row.getValue("duplicate"),
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
