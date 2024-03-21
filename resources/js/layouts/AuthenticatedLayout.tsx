import { PropsWithChildren, ReactNode } from 'react';
import { User } from '@/types';
import Header from './components/header';
import Sidebar from './components/sidebar';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"

export default function Authenticated({ user, header, children, subheaderAction, breadcrumbs }: PropsWithChildren<{ user: User, header?: ReactNode, subheaderAction?: ReactNode, breadcrumbs?: ReactNode }>) {

    return (
        <>
            <Header user={user}/>
            <div className="flex h-screen border-collapse overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto overflow-x-hidden pt-[65px] bg-secondary/30 pb-1">
                    <div className="flex h-full flex-col">
                        <div className="flex-1 space-y-4 p-4 md:p-8">
                            <div className="flex items-center justify-between space-y-2">
                                <div className="flex flex-col justify-center">
                                    <h2 className="text-xl font-bold tracking-tight">{ header }</h2>
                                    <Breadcrumb>
                                            <BreadcrumbList>
                                                <BreadcrumbItem>
                                                    <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
                                                </BreadcrumbItem>
                                                {
                                                    breadcrumbs && (
                                                        <>
                                                            <BreadcrumbSeparator/>
                                                            { breadcrumbs }
                                                        </>
                                                    )
                                                }
                                            </BreadcrumbList>
                                        </Breadcrumb>

                                </div>
                                <div className="flex items-center space-x-2">
                                    { subheaderAction }
                                </div>
                            </div>

                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
