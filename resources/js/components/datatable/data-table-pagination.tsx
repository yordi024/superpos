import { PaginationLinks, PaginationMeta } from "@/types";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "../ui/pagination";
import { table } from "console";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronFirst,
  ChevronLast,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { link } from "fs";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";

export function DataTablePagination({ meta }: { meta: PaginationMeta }) {
  const [prevLink, links, nextLink] = [
    meta.links[0],
    meta.links.slice(1, -1),
    meta.links.at(-1)!,
  ];

  return (
    <>
      <div className="text-xs text-muted-foreground">
        Showing{" "}
        <strong>
          {meta.from}-{meta.to}
        </strong>{" "}
        of <strong>{meta.total}</strong> products
      </div>
      <Pagination className="mx-0 w-fit">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={prevLink.url} />
          </PaginationItem>
          {links.map(link =>
            link.url ? (
              <PaginationItem key={link.label}>
                <PaginationLink href={link.url} isActive={link.active}>
                  {link.label}
                </PaginationLink>
              </PaginationItem>
            ) : (
              <PaginationItem key={link.label}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          )}
          <PaginationItem>
            <PaginationNext href={nextLink.url} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}

export function DataTableSimplePagination({
  meta,
  links,
  perPage,
  onPageChange,
}: {
  meta: PaginationMeta;
  links: PaginationLinks;
  perPage: string;
  onPageChange: (value: string) => void;
}) {
  function handleNavigation(url: string | null) {
    if (!url) {
      return;
    }

    router.visit(url, {
      method: "get",
      preserveScroll: true,
      preserveState: true,
    });
  }

  return (
    <>
      <div className="flex-1 text-sm text-muted-foreground">
        Showing {meta.from} - {meta.to} of {meta.total} rows.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select value={perPage} onValueChange={onPageChange}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={perPage} />
            </SelectTrigger>
            <SelectContent side="top">
              {["15", "25", "50", "100"].map(pageSize => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium text-muted-foreground">
          Page {meta.current_page} of {meta.last_page}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handleNavigation(links.first)}
            disabled={!links.first || meta.current_page === 1}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronFirst className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handleNavigation(links.prev)}
            disabled={!links.prev}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handleNavigation(links.next)}
            disabled={!links.next}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handleNavigation(links.last)}
            disabled={!links.last || meta.current_page === meta.last_page}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronLast className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
