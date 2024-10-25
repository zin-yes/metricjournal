import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.CF_PAGES_URL) return `https://${process.env.CF_PAGES_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}
