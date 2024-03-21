import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from '@/components/ui/button';

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={"Dashboard"}
            subheaderAction={
            <>
                <Button size="sm">Download</Button>
            </>
            }
        >
            <Head title="Dashboard" />

            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-md sm:rounded-lg">
                <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in!</div>
            </div>
        </AuthenticatedLayout>
    );
}
