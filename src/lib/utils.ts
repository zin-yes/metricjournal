import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;

  return process.env.NODE_ENV === "production"
    ? `https://metricjournal.com`
    : `http://localhost:${process.env.PORT ?? 3000}`;
}
