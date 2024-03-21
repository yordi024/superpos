import { PropsWithChildren, ReactNode } from 'react';
import { User } from '@/types';
import Header from './components/header';
import Sidebar from './components/sidebar';

export default function Authenticated({ user, header, children, subheaderAction }: PropsWithChildren<{ user: User, header?: ReactNode, subheaderAction?: ReactNode }>) {

    return (
        <>
            <Header user={user}/>
            <div className="flex h-screen border-collapse overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto overflow-x-hidden pt-[65px] bg-secondary/10 pb-1">
                <div className="flex h-full flex-col">
                    <div className="flex-1 space-y-4 p-4 md:p-8">
                        <div className="flex items-center justify-between space-y-2">
                            <h2 className="text-3xl font-bold tracking-tight">{ header }</h2>
                            <div className="flex items-center space-x-2">
                                { subheaderAction  }
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
