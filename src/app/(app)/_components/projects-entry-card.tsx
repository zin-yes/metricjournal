import { type ProjectEntry } from "@/database/schema";

export default function ProjectEntryCard({
  projectEntry,
}: {
  projectEntry: ProjectEntry;
}) {
  return (
    <div>
      <pre>{JSON.stringify(projectEntry, null, 2)}</pre>
    </div>
  );
}
