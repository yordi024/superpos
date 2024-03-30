import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function Index({ auth }: PageProps) {
  return (
    <AuthenticatedLayout user={auth.user} header={"Users"}>
      <Head title="Users" />
    </AuthenticatedLayout>
  );
}
