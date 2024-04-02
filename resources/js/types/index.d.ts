import { Config } from "ziggy-js";
import { type LucideIcon } from "lucide-react";

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  avatar_url: string;
  email_verified_at: string;
  is_active: boolean;
  created_at: string;
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
  hasChidren?: boolean;
  path?: string;
  children?: NavItem[];
}

export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: {
    url: string;
    label: string;
    active: boolean;
  }[];
  per_page: number;
  to: number;
  total: number;
}

export interface Resources<T> {
  data: T[];
  links: {
    first: string;
    last: string;
    next: string;
    prev: string;
  };
  meta: PaginationMeta;
}

export interface Filters {
  search?: string;
  column?: string;
  sort?: string;
}

export interface UserResource extends Resources<User> {}
