import { Home, Users2, List } from "lucide-react";
import { type NavItem } from "@/types";

export const ROUTES = {
  DASHBOARD: "dashboard",
  USERS_GROUP: "users",
  SEE_USERS: "users.index",
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
    href: ROUTES.USERS_GROUP,
    color: "text-orange-500",
    path: "/users",
    hasChidren: true,
    children: [
      {
        title: "See Users",
        icon: List,
        color: "text-primary",
        href: ROUTES.SEE_USERS,
      },
    ],
  },
];
