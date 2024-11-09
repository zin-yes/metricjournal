import { useSession } from "@/hooks/use-session";

export default function WhenSignedOut({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();

  if (session?.user) return null;

  return children;
}
