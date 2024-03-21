import { BookOpenCheck, LayoutDashboard } from "lucide-react";
import { type NavItem } from "@/types";

export const NavItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-primary",
  },
  {
    title: "Example",
    icon: BookOpenCheck,
    href: "/example",
    color: "text-orange-500",
    isChidren: true,
    children: [
      {
        title: "Example-01",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/example/employees",
      },
      {
        title: "Example-02",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/example/example-02",
      },
      {
        title: "Example-03",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/example/example-03",
      },
    ],
  },
];
