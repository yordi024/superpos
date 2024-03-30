import { Config } from "ziggy-js";
import { type LucideIcon } from "lucide-react";

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  avatar_url: string;
  email_verified_at: string;
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  auth: {
    user: User;
  };
  ziggy: Config & { location: string };
};

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  color?: string;
  isChidren?: boolean;
  children?: NavItem[];
}
