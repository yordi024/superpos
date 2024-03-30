import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import { type PageProps } from "@/types";
import { BreadcrumbItem, BreadcrumbPage } from "@/components/ui/breadcrumb";

export default function Edit({
  auth,
  mustVerifyEmail,
  status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={"Profile"}
      breadcrumbs={
        <BreadcrumbItem>
          <BreadcrumbPage>Profile</BreadcrumbPage>
        </BreadcrumbItem>
      }
    >
      <Head title="Profile" />

      <>
        <UpdateProfileInformationForm
          mustVerifyEmail={mustVerifyEmail}
          status={status}
          className="max-w-xl"
        />

        <UpdatePasswordForm className="max-w-xl" />

        <DeleteUserForm className="max-w-xl" />
      </>
    </AuthenticatedLayout>
  );
}
