import { type NavItem } from "@/types";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./subnav-accordion";
import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Link } from "@inertiajs/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SideNavProps {
  items: NavItem[];
  setOpen?: (open: boolean) => void;
  className?: string;
}

export function SideNav({ items, setOpen }: SideNavProps) {
  const currentRoute = route().current()?.split(".")[0];

  const { isOpen } = useSidebar();
  const [openItem, setOpenItem] = useState(currentRoute);

  return (
    <TooltipProvider>
      {items.map(item =>
        item.hasChidren ? (
          <Accordion
            type="single"
            collapsible
            className="space-y-2"
            key={item.title}
            value={openItem}
            onValueChange={setOpenItem}
          >
            <AccordionItem value={item.href} className="border-none">
              <AccordionTrigger className="py-0 hover:no-underline">
                {NavItem({
                  item,
                  isOpen,
                  setOpen,
                  active: item.title === openItem,
                })}
                {isOpen && item.hasChidren && (
                  <ChevronDownIcon className="mr-2 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200" />
                )}
              </AccordionTrigger>
              <AccordionContent
                className={cn("mt-2 grid space-y-1 pb-1", isOpen && "ml-5")}
              >
                {item.children?.map(child =>
                  NavItem({ item: child, isOpen, setOpen, link: true })
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          NavItem({ item, isOpen, setOpen, link: true })
        )
      )}
    </TooltipProvider>
  );
}

function NavItem({
  item,
  isOpen,
  setOpen,
  link,
  active = false,
}: {
  item: NavItem;
  isOpen: boolean;
  setOpen: ((open: boolean) => void) | undefined;
  link?: boolean;
  active?: boolean;
}) {
  const navItem = (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "flex h-9 items-center gap-4 p-2.5 rounded-lg !text-lg text-muted-foreground transition-colors hover:text-foreground",
            !isOpen && "p-0 w-9 justify-center",
            (route().current(item.href) || active) &&
              (isOpen
                ? "text-accent-foreground"
                : "bg-accent  text-accent-foreground")
          )}
          onClick={() => {
            if (setOpen && link) setOpen(false);
          }}
        >
          <item.icon className={cn("h-5 w-5")} />
          <span
            className={cn(
              "duration-200",
              !isOpen && "absolute left-12 opacity-0"
            )}
          >
            {item.title}
          </span>
        </div>
      </TooltipTrigger>
      {!isOpen && <TooltipContent side="right">{item.title}</TooltipContent>}
    </Tooltip>
  );

  if (link) {
    return (
      <Link href={route(item.href)} key={item.title}>
        {navItem}
      </Link>
    );
  }

  return <div key={item.title}>{navItem}</div>;
}
