import { db } from "@/server/db";

export default async function IndexPage() {
  const data = await db.query.entries.findMany();
  return (
    <main>
      Example data fetched from workers:
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
