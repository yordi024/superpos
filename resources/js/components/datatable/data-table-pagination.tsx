import { PaginationMeta } from "@/types";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "../ui/pagination";

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
