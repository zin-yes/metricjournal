"use client";

import WhenSignedIn from "@/components/utils/when-signed-in";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import WhenSignedOut from "@/components/utils/when-signed-out";
import { useIsMobile } from "@/hooks/use-mobile";
import { SessionResult } from "@/services/auth/auth.service";
import { useInnerWindowSize } from "@/hooks/use-inner-window-size";

// TODO: Give this some proper thought
export default function Navigation({
  session,
  items,
}: {
  session: SessionResult;
  items: { name: string; href: string }[];
}) {
  return (
    <>
      <DesktopNavigationMenu session={session} items={items} />
      <MobileNavigationMenu session={session} items={items} />
    </>
  );
}

export function DesktopNavigationMenu({
  session,
  items,
}: {
  session: SessionResult;
  items: { name: string; href: string }[];
}) {
  return (
    <div className="md:flex flex-col justify-center items-center hidden pt-4 sticky top-0 left-0 right-0 px-6">
      <header className="flex flex-row justify-between items-center  w-full p-4 border rounded-[var(--radius)] px-6 bg-background/80 backdrop-blur-md max-w-[800px]">
        <Logo />
        <ItemList items={items} session={session} />
      </header>
    </div>
  );
}

function MobileNavigationMenu({
  session,
  items,
}: {
  session: SessionResult;
  items: { name: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              x: "100%",
            }}
            exit={{
              x: "100%",
            }}
            animate={{
              x: 0,
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="fixed top-0 left-0 right-0 bottom-0 w-[100vw] h-[100vh]"
          >
            <NavigationMenu items={items} session={session} />
          </motion.div>
        )}
      </AnimatePresence>
      <header className="sticky top-0 left-0 right-0 bg-background/80 backdrop-blur-md flex flex-row justify-between items-center p-4 px-6 border-b  md:hidden">
        <Logo />
        <ItemList items={items} session={session} />
        <HamburgerMenu open={open} setOpen={setOpen} />
      </header>
    </>
  );
}

function Logo() {
  return (
    <div>
      <h1 className="text-xl font-bold">MetricJournal</h1>
    </div>
  );
}

function HamburgerMenu({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) {
      setOpen(false);
    }
  }, [isMobile, setOpen]);

  return (
    <AnimatePresence>
      <div
        className="h-[10px] w-[24px] flex flex-col justify-between cursor-pointer items-center md:hidden"
        onClick={() => setOpen(!open)}
      >
        <motion.div
          animate={open ? { rotate: 45, y: 4.38 } : { rotate: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="h-[1.5px] w-full rounded-lg bg-foreground"
        />
        <motion.div
          animate={
            open ? { width: 0, opacity: 0 } : { width: "100%", opacity: 1 }
          }
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="h-[1.5px] w-full rounded-lg bg-foreground"
        ></motion.div>
        <motion.div
          animate={open ? { rotate: -45, y: -4.38 } : { rotate: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="h-[1.5px] w-full rounded-lg bg-foreground"
        />
      </div>
    </AnimatePresence>
  );
}

function ItemList({
  items,
  session,
}: {
  items: { name: string; href: string }[];
  session: SessionResult;
}) {
  return (
    <div className="flex-row gap-5 items-center justify-end hidden md:flex">
      {items.map((item) => (
        <div key={item.name + "-nav-menu-link"} className="w-fit">
          <Link href={item.href}>
            <span className="hover:underline">{item.name}</span>
          </Link>
        </div>
      ))}
      <WhenSignedOut session={session}>
        <div className="flex flex-row gap-3 justify-center items-center">
          <Button variant="outline">
            <Link href="/signin">Sign In</Link>
          </Button>

          <Button variant="outline">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </WhenSignedOut>
      <WhenSignedIn session={session}>
        <Button variant="outline">
          <Link href="/signout">Sign Out</Link>
        </Button>
      </WhenSignedIn>
    </div>
  );
}

export function NavigationMenu({
  session,
  items,
}: {
  session: SessionResult;
  items: { name: string; href: string }[];
}) {
  const { innerWidth, innerHeight } = useInnerWindowSize();

  return (
    <div
      className={`absolute top-0 left-0 right-0 bottom-0 w-[${innerWidth}px] h-[${innerHeight}px] bg-background/80 backdrop-blur-md border-l`}
    >
      <nav className="w-full px-6 pt-20 pb-6 flex flex-col justify-between">
        <ul>
          {items.map((item) => (
            <Link key={item.name} href={item.href}>
              <li className="underline text-xl">{item.name}</li>
            </Link>
          ))}
        </ul>
        <div className="w-full flex flex-col gap-2">
          <WhenSignedOut session={session}>
            <Button className="w-full" variant="default" size="icon">
              <Link href="/signin">Sign In</Link>
            </Button>

            <Button className="w-full" variant="default" size="icon">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </WhenSignedOut>
          <WhenSignedIn session={session}>
            <Button className="w-full" variant="default" size="icon">
              <Link href="/signout">Sign Out</Link>
            </Button>
          </WhenSignedIn>
        </div>
      </nav>
    </div>
  );
}
