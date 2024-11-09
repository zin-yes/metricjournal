import { useSession } from "@/hooks/use-session";

export default function WhenSignedIn({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();

  if (session?.user) return children;

  return null;
}
