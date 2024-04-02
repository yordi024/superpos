import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { Column } from "@tanstack/react-table";

interface SortableColumnHeaderProps<TData, TValue> {
  header: string;
  column: Column<TData, TValue>;
}

export function SortableColumnHeader<TData, TValue>({
  header,
  column,
}: SortableColumnHeaderProps<TData, TValue>) {
  return (
    <Button variant="ghost" onClick={() => column.toggleSorting()}>
      {header}
      {
        {
          asc: <ArrowUp className="ml-2 h-4 w-4" />,
          desc: <ArrowDown className="ml-2 h-4 w-4" />,
          false: <ArrowUpDown className="ml-2 h-4 w-4" />,
        }[String(column.getIsSorted())]
      }
    </Button>
  );
}
