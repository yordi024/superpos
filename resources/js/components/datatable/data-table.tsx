import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import { Filters, PaginationLinks, PaginationMeta } from "@/types";
import { Search } from "lucide-react";
import { DebounceInput } from "../ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { DataTableSimplePagination } from "./data-table-pagination";
import { pickBy } from "@/lib/utils";
import { usePrevious } from "react-use";
import { ScrollArea } from "../ui/scroll-area";
interface DataTableProps<TData, TColumnDef> {
  columns: ColumnDef<TData, TColumnDef>[];
  data: TData[];
  meta: PaginationMeta;
  paginationLinks: PaginationLinks;
  filters: Filters;
  onEdit?: (row: TData) => void;
}
export function DataTable<TData, TValue>({
  columns,
  data,
  meta,
  paginationLinks,
  filters,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: filters.column!, desc: filters.sort === "desc" },
  ]);

  const [filterValues, setFilterValues] = useState<Record<string, string>>({
    search: filters.search || "",
    column: filters.column || "",
    sort: filters.sort || "",
    perPage: filters.perPage || "15",
  });

  const preValues = usePrevious(filterValues);
  const preSorting = usePrevious(sorting);

  function handleChange(key: string, value: string) {
    setFilterValues(filters => ({
      ...filters,
      [key]: value,
    }));
  }

  const table = useReactTable({
    data,
    columns,
    manualSorting: true,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
  });

  useEffect(() => {
    function handleRequest() {
      const query = Object.keys(pickBy(filterValues)).length
        ? pickBy(filterValues)
        : { remember: "forget" };

      if (preValues) {
        router.get(
          route(route().current()!),
          { ...(query as Record<string, string>) },
          {
            replace: true,
            preserveState: true,
            preserveScroll: true,
          }
        );
      }
    }
    handleRequest();
  }, [filterValues]);

  useEffect(() => {
    if (preSorting) {
      setFilterValues(filters => ({
        ...filters,
        column: sorting[0]?.id ?? "",
        sort: sorting[0]?.id ? (sorting[0]?.desc ? "desc" : "asc") : "",
      }));
    }
  }, [sorting]);

  return (
    <Card className="p-0 w-full overflow-auto">
      <CardHeader className="ml-auto flex items-center gap-2 mb-3 border-b px-4 py-2">
        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <DebounceInput
            type="search"
            placeholder="Search..."
            name="search"
            value={filterValues.search}
            onChangeDebounce={value => handleChange("search", value)}
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
      </CardHeader>
      <CardContent className="p-0 border-b">
        <ScrollArea className="h-[600px]">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, {
                        ...cell.getContext(),
                      })}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex items-center justify-between px-4 py-2">
        <DataTableSimplePagination
          links={paginationLinks}
          meta={meta}
          perPage={filterValues.perPage}
          onPageChange={value => handleChange("perPage", value)}
        />
      </CardFooter>
    </Card>
  );
}
