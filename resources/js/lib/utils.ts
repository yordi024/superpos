import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pickBy(object: Record<string, unknown>) {
  const obj = {} as Record<string, unknown>;
  for (const key in object) {
    if (object[key]) {
      obj[key] = object[key];
    }
  }
  return obj;
}
