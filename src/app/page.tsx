"use client";
import { api } from "@/trpc/react";

export default function IndexPage() {
  const data = api.entries.getAllEntries.useQuery();
  return (
    <main>
      Example data fetched from workers:
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
