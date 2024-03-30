import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function Create({ auth }: PageProps) {
  return (
    <AuthenticatedLayout user={auth.user} header={"Create User"}>
      <Head title="Create User" />
    </AuthenticatedLayout>
  );
}
