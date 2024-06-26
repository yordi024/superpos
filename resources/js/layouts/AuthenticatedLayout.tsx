import { PropsWithChildren, ReactNode } from "react";
import { User } from "@/types";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Dashboard({
  user,
  children,
  header,
  subheaderAction,
  breadcrumbs,
}: PropsWithChildren<{
  user: User;
  header?: ReactNode;
  subheaderAction?: ReactNode;
  breadcrumbs?: ReactNode;
}>) {
  const { isOpen } = useSidebar();

  return (
    <div className="grid min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div
        className={cn(
          "flex flex-col sm:gap-4 sm:pb-4 sm:pl-14",
          isOpen && "sm:pl-[18rem]"
        )}
      >
        <Header user={user} breadcrumbs={breadcrumbs} />
        <main className="grid items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-3">
          {header && (
            <div className="flex items-center">
              <div className="text-lg md:text-2xl font-bold tracking-tight">
                {header}
              </div>
              {subheaderAction && (
                <div className="flex items-center ml-auto gap-2">
                  {subheaderAction}
                </div>
              )}
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
