"use client";

import WhenSignedIn from "@/components/utils/when-signed-in";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import WhenSignedOut from "@/components/utils/when-signed-out";
import { useIsMobile } from "@/hooks/use-mobile";
import { useInnerWindowSize } from "@/hooks/use-inner-window-size";

// TODO: Give this some proper thought
export default function Navigation({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  return (
    <>
      <DesktopNavigationMenu items={items} />
      <MobileNavigationMenu items={items} />
    </>
  );
}

export function DesktopNavigationMenu({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  return (
    <div className="md:flex flex-col justify-center items-center hidden pt-4 sticky top-0 left-0 right-0 px-6 pointer-events-none">
      <header className="flex flex-row justify-between items-center  w-full p-4 border rounded-[var(--radius)] px-6 bg-background/70 backdrop-blur-md max-w-[800px] pointer-events-auto">
        <Logo />
        <ItemList items={items} />
      </header>
    </div>
  );
}

function MobileNavigationMenu({
  items,
}: {
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
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="fixed top-0 left-0 right-0 bottom-0 w-[100vw] h-[100vh]"
          >
            <NavigationMenu items={items} />
          </motion.div>
        )}
      </AnimatePresence>
      <header className="sticky top-0 left-0 right-0  flex flex-col justify-between items-center md:hidden">
        <motion.div
          className="w-full h-full flex flex-row justify-between items-center p-4 px-6 bg-background/70 backdrop-blur-md"
          animate={
            open
              ? { background: "rgba(0,0,0,0)", backdropFilter: "none" }
              : {
                  background: "hsla(var(--background), 0.7)",
                  backdropFilter: "blur(20px)",
                }
          }
        >
          <Logo />
          <ItemList items={items} />
          <HamburgerMenu open={open} setOpen={setOpen} />
        </motion.div>
        <motion.div
          className="w-full h-[1px] bg-border/70 backdrop-blur-md"
          animate={
            open ? { width: 0, opacity: 0 } : { width: "100%", opacity: 1 }
          }
        />
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
          animate={open ? { rotate: 45, y: 4.38, width: 20 } : { rotate: 0 }}
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
          animate={open ? { rotate: -45, y: -4.38, width: 20 } : { rotate: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="h-[1.5px] w-full rounded-lg bg-foreground"
        />
      </div>
    </AnimatePresence>
  );
}

function ItemList({ items }: { items: { name: string; href: string }[] }) {
  return (
    <div className="flex-row gap-5 items-center justify-end hidden md:flex">
      {items.map((item) => (
        <div key={item.name + "-nav-menu-link"} className="w-fit">
          <Link href={item.href}>
            <span className="hover:underline">{item.name}</span>
          </Link>
        </div>
      ))}
      <WhenSignedOut>
        <div className="flex flex-row gap-3 justify-center items-center">
          <Button variant="outline">
            <Link href="/signin">Sign In</Link>
          </Button>

          <Button variant="outline">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </WhenSignedOut>
      <WhenSignedIn>
        <Button variant="outline" className="bg-transparent">
          <Link href="/signout">Sign Out</Link>
        </Button>
      </WhenSignedIn>
    </div>
  );
}

export function NavigationMenu({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  const { innerWidth, innerHeight } = useInnerWindowSize();

  return (
    <div
      className={`absolute top-0 left-0 right-0 bottom-0 w-[${innerWidth}px] h-[${innerHeight}px] bg-background/70 backdrop-blur-md`}
    >
      <nav className="w-full h-full px-6 pt-20 pb-6 flex flex-col justify-between">
        <ul>
          {items.map((item) => (
            <Link key={item.name} href={item.href}>
              <li className="underline text-xl">{item.name}</li>
            </Link>
          ))}
        </ul>
        <div className="w-full flex flex-col gap-2">
          <WhenSignedOut>
            <Button className="w-full" variant="default">
              <Link href="/signin">Sign In</Link>
            </Button>

            <Button className="w-full" variant="default">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </WhenSignedOut>
          <WhenSignedIn>
            <Button className="w-full" variant="default">
              <Link href="/signout">Sign Out</Link>
            </Button>
          </WhenSignedIn>
        </div>
      </nav>
    </div>
  );
}
