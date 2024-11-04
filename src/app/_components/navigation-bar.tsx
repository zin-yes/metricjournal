import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function NavigationBar({ user }: { user: any }) {
  return (
    <header className="sticky w-full top-0 left-0 right-0 z-50 h-fit py-3 px-4 bg-background/80 border-b backdrop-blur-lg md:hidden">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-xl font-bold">MetricJournal</h1>
        {user !== undefined ? (
          <div className="flex flex-row gap-2 items-center">
            <Avatar>
              <AvatarImage src={user.image} />
              <AvatarFallback>{user.name?.[0]}</AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <div className="flex flex-row gap-2">
            <Button asChild variant="outline">
              <Link href="/signin">Sign In</Link>
            </Button>

            <Button asChild variant="outline">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
