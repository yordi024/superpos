import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "@inertiajs/react";
import { NavItem as NavItemType } from "@/types";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  CollapsedAccordionTrigger,
} from "@/components/ui/accordion";
import { Menu } from "lucide-react";

interface NavProps {
  isCollapsed: boolean;
  links: NavItemType[];
  handleToggle: () => void;
}

export function Nav({ links, isCollapsed, handleToggle }: NavProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <TooltipProvider>
        <nav className="grid gap-2 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          <Button onClick={handleToggle} variant={"ghost"} size="icon">
            <Menu className="h-5 w-5" />
          </Button>
          {links.map((item, index) =>
            isCollapsed ? (
              <CollapsedNavItem key={index} item={item} />
            ) : (
              <NavItem key={index} item={item} />
            )
          )}
        </nav>
      </TooltipProvider>
    </div>
  );
}

function CollapsedNavItem({ item }: { item: NavItemType }) {
  return (
    <Tooltip delayDuration={0}>
      {item.hasChidren ? (
        <Accordion type="single" defaultValue={route().current()} collapsible>
          <AccordionItem value={item.href} className="border-none">
            <CollapsedAccordionTrigger
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "icon",
                }),
                "hover:no-underline"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="sr-only">{item.title}</span>
            </CollapsedAccordionTrigger>
            <AccordionContent className="pb-0 pt-1 grid border-b space-y-1">
              {item.children?.map((child, index) => (
                <CollapsedNavItem key={index} item={child} />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <>
          <TooltipTrigger asChild>
            <Link
              href={route(item.href)}
              className={cn(
                buttonVariants({
                  variant: route().current(item.href) ? "secondary" : "ghost",
                  size: "icon",
                }),
                "h-9 w-9",
                route().current(item.href) &&
                  "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="sr-only">{item.title}</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="flex items-center gap-4">
            {item.title}
            {item.label && (
              <span className="ml-auto text-muted-foreground">
                {item.label}
              </span>
            )}
          </TooltipContent>
        </>
      )}
    </Tooltip>
  );
}

function NavItem({ item }: { item: NavItemType }) {
  return item.hasChidren ? (
    <Accordion type="single" defaultValue={route().current()} collapsible>
      <AccordionItem value={item.href} className="border-none">
        <AccordionTrigger
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "sm",
            }),
            "justify-between hover:no-underline"
          )}
        >
          <span className="flex items-center">
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </span>
        </AccordionTrigger>
        <AccordionContent className="pb-0 pt-1 grid border-b space-y-1">
          {item.children?.map((child, index) => (
            <NavItem key={index} item={child} />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ) : (
    <Link
      href={route(item.href)}
      className={cn(
        buttonVariants({
          variant: route().current(item.href) ? "secondary" : "ghost",
          size: "sm",
        }),
        route().current(item.href) &&
          "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
        "justify-start"
      )}
    >
      <item.icon className="mr-2 h-4 w-4" />
      {item.title}
      {item.label && (
        <span
          className={cn(
            "ml-auto",
            route().current(item.href) && "text-background dark:text-white"
          )}
        >
          {item.label}
        </span>
      )}
    </Link>
  );
}
