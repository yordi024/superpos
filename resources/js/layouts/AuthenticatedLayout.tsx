import { PropsWithChildren, ReactNode } from "react";
import { User } from "@/types";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";

export default function Dashboard({
  user,
  header,
  children,
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
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div
        className={cn(
          "flex flex-col sm:gap-4 sm:py-4 sm:pl-14",
          isOpen && "sm:pl-[18rem]"
        )}
      >
        <Header user={user} breadcrumbs={breadcrumbs} />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {header && (
            <div className="text-xl font-bold tracking-tight">{header}</div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
