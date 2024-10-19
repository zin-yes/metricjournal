"use client";
import { api } from "@/trpc/react";

export default function IndexPage() {
  const data = api.example.example.useQuery();
  return (
    <main>
      Example data fetched from workers:
      <pre>
        {data.isSuccess
          ? JSON.stringify(data.data, null, 2)
          : data.isError
          ? "Error"
          : "Loading..."}
      </pre>
    </main>
  );
}
