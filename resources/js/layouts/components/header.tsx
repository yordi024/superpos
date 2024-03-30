import { cn } from "@/lib/utils";
import { Boxes } from "lucide-react";
import { Link } from "@inertiajs/react";
import ThemeSwitch from "./theme-switch";
import { UserNav } from "./user-nav";
import { User } from "@/types";
import { MobileSidebar } from "./mobile-sidebar";
import ApplicationLogo from "@/components/ApplicationLogo";

type Props = {
  user: User;
};

export default function Header({ user }: Props) {
  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur shadow-sm">
      <nav className="flex h-[65px] items-center justify-between px-4 md:px-8">
        <Link
          href={"/"}
          className="hidden items-center justify-between gap-2 md:flex"
        >
          <ApplicationLogo className="h-6 w-6 fill-current" />
          <h1 className="text-lg font-semibold">SuperPOS</h1>
        </Link>
        <div className={cn("block md:!hidden")}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <ThemeSwitch />
          <UserNav user={user} />
        </div>
      </nav>
    </div>
  );
}
