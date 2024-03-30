import { Home, Users2, Plus, List } from "lucide-react";
import { type NavItem } from "@/types";

export const ROUTES = {
  DASHBOARD: "dashboard",
  SEE_USERS: "users.index",
  CREATE_USER: "users.create",
};

export const MENU_ROUTES = ["/users"];

export const NavItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: Home,
    href: ROUTES.DASHBOARD,
    path: "/dashboard",
    color: "text-primary",
  },
  {
    title: "Users",
    icon: Users2,
    href: ROUTES.SEE_USERS,
    color: "text-orange-500",
    path: "/users",
    hasChidren: true,
    children: [
      {
        title: "Create User",
        icon: Plus,
        color: "text-primary",
        href: ROUTES.CREATE_USER,
      },
      {
        title: "See Users",
        icon: List,
        color: "text-primary",
        href: ROUTES.SEE_USERS,
      },
    ],
  },
];
