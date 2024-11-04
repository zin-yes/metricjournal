import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import WhenSignedIn from "@/components/utils/when-signed-in";
import { type SessionResult } from "@/server/api/auth/service/auth.service.types";

// TODO: Give this some proper thought
export default function Navigation({ session }: { session: SessionResult }) {
  return (
    <header className="sticky top-0 left-0 right-0 bg-blue-500 flex flex-row justify-between items-center p-4 px-6">
      <div>
        <h1 className="text-xl font-bold">MetricJournal</h1>
      </div>
      <WhenSignedIn session={session}>
        <div>
          <Avatar>
            <AvatarImage src={session?.user.image} />
            <AvatarFallback>{session?.user.name?.[0]}</AvatarFallback>
          </Avatar>
        </div>
      </WhenSignedIn>
    </header>
  );
}

export function NavigationMenu({ open }: { open: boolean }) {
  return <>{open && <div>Menu!</div>}</>;
}
