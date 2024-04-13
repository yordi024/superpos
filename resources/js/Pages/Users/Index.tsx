import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { Filters, PageProps, User, UserResource } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { DataTable } from "@/components/datatable/data-table";
import { columns } from "./colunms";
import { BreadcrumbItem, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { PlusCircle, File, MoreHorizontal } from "lucide-react";
import { CreateUserModal } from "./create-user-modal";
import { useMemo, useState } from "react";
import { EditUserModal } from "./edit-user-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteUserModal from "./delete-user-modal";
interface UserPageProps extends PageProps {
  users: UserResource;
  filters: Filters;
}

export default function Index({ auth, users, filters }: UserPageProps) {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  function handleEditAction(user: User) {
    setSelectedUser(user);
    setOpenEditModal(true);
  }

  function handleDeleteAction(user: User) {
    setSelectedUser(user);
    setOpenDeleteModal(true);
  }

  const tableColumns = useMemo(
    () => [
      ...columns,
      {
        id: "actions",
        cell: ({ row }) => {
          const user = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button aria-haspopup="true" size="icon" variant="ghost">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link href={route("users.show", user.id)}>View</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleEditAction(user)}>
                  Edit
                </DropdownMenuItem>
                {user.id !== auth.user?.id && (
                  <DropdownMenuItem onClick={() => handleDeleteAction(user)}>
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    []
  );

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={"Users"}
      breadcrumbs={
        <BreadcrumbItem>
          <BreadcrumbPage>Users</BreadcrumbPage>
        </BreadcrumbItem>
      }
      subheaderAction={
        <>
          <Button size="sm" variant="outline" className="gap-1">
            <File className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button
            onClick={() => setOpenCreateModal(true)}
            size="sm"
            className="gap-1"
          >
            <PlusCircle className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add User
            </span>
          </Button>
        </>
      }
    >
      <CreateUserModal open={openCreateModal} setOpen={setOpenCreateModal} />
      {selectedUser && (
        <>
          <EditUserModal
            open={openEditModal}
            setOpen={setOpenEditModal}
            user={selectedUser}
            setSelectedUser={setSelectedUser}
          />

          <DeleteUserModal
            open={openDeleteModal}
            setOpen={setOpenDeleteModal}
            user={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        </>
      )}

      <Head title="Users" />

      <DataTable
        filters={filters}
        data={users.data}
        meta={users.meta}
        paginationLinks={users.links}
        columns={tableColumns}
      />
    </AuthenticatedLayout>
  );
}
