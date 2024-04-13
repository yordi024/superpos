import { Badge } from "@/components/ui/badge";
import { User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { SortableColumnHeader } from "@/components/datatable/sortable-column-header";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <SortableColumnHeader header="ID" column={column} />;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <SortableColumnHeader header="Name" column={column} />;
    },
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "is_active",
    header: "Is Active",
    cell: info =>
      info.getValue() ? (
        <Badge variant="default">Active</Badge>
      ) : (
        <Badge variant="destructive">Inactive</Badge>
      ),
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
];
