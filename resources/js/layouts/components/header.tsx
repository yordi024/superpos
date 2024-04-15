import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ReactNode } from "react";
import { UserNav } from "./user-nav";
import type { User } from "@/types";
import { MobileSidebar } from "./mobile-sidebar";
import { Link } from "@inertiajs/react";
import ThemeSwitch from "./theme-switch";

export default function Header({
  user,
  breadcrumbs,
}: {
  user: User;
  breadcrumbs: ReactNode;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-[60px] items-center gap-4 border-b bg-background px-4 sm:static sm:px-6">
      <MobileSidebar />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={route("dashboard")}>Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {breadcrumbs && (
            <>
              <BreadcrumbSeparator />
              {breadcrumbs}
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="ml-auto flex items-center gap-2">
        <ThemeSwitch />
        <UserNav user={user} />
      </div>
    </header>
  );
}
