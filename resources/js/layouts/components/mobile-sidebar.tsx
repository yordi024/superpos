import { useState, useEffect } from "react";
import { PanelLeft } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SideNav } from "./side-nav";
import { NavItems } from "@/constants/sidebar-menu";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import ApplicationLogo from "@/components/ApplicationLogo";

export const MobileSidebar = () => {
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <ApplicationLogo className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">SuperPOS</span>
            </Link>
            <SideNav items={NavItems} setOpen={setOpen} />
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};
