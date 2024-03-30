import { Link } from "@inertiajs/react";
import { SideNav } from "./side-nav";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowLeft, Settings } from "lucide-react";
import { NavItems } from "@/constants/sidebar-menu";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";
import { useState } from "react";
import ApplicationLogo from "@/components/ApplicationLogo";

export default function Sidebar() {
  const { isOpen, toggle } = useSidebar();
  const [status, setStatus] = useState(false);

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-10 hidden flex-col border-r bg-background sm:flex",
        status && "duration-500",
        isOpen ? "w-[18rem]" : "w-15"
      )}
    >
      <span
        className={cn(
          "absolute -right-3 top-16 cursor-pointer rounded-full border p-1 bg-background text-3xl text-foreground",
          !isOpen && "rotate-180"
        )}
        onClick={handleToggle}
      >
        <ArrowLeft className="h-5 w-5" />
      </span>
      <nav
        className={cn("flex flex-col gap-6 text-lg font-medium px-2 md:py-5")}
      >
        <Link
          href="#"
          className="mb-5 group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
        >
          <ApplicationLogo className="h-5 w-5 transition-all group-hover:scale-110" />
          <span className="sr-only">SuperPOS</span>
        </Link>
        <SideNav items={NavItems} />
      </nav>
      {/* <nav className="w-full flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href={route("dashboard")}
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <ApplicationLogo className="h-5 w-5 fill-white transition-all group-hover:scale-110" />
          <span className="sr-only">SuperPOS</span>
        </Link>
        <div className="border-b border-muted-foreground w-3/4" />

        <SideNav items={NavItems} />
      </nav> */}
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
}
