"use client";

import WhenSignedIn from "@/components/utils/when-signed-in";
import { type SessionResult } from "@/server/api/auth/service/auth.service.types";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Wrapper } from "../layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import WhenSignedOut from "@/components/utils/when-signed-out";

// TODO: Give this some proper thought
export default function Navigation({ session }: { session: SessionResult }) {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

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
            className="z-1000 fixed top-0 left-0 right-0 bottom-0 w-[100vw] h-[100vh]"
          >
            <NavigationMenu session={session} />
          </motion.div>
        )}
      </AnimatePresence>
      <header className="sticky top-0 left-0 right-0 bg-background/80 backdrop-blur-md flex flex-row justify-between items-center p-4 px-6 border-b">
        <div>
          <h1 className="text-xl font-bold">MetricJournal</h1>
        </div>

        <AnimatePresence>
          <div
            className="h-[10px] w-[24px] flex flex-col justify-between cursor-pointer items-center"
            onClick={() => toggleMenu()}
          >
            <motion.div
              initial={{ rotate: 0, width: "100%" }}
              animate={open ? { rotate: 20, y: 4.5 } : { rotate: 0 }}
              transition={{ duration: 0.7 }}
              className="h-[1px] w-full rounded-lg bg-foreground"
            />
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={
                open ? { width: 0, opacity: 0 } : { width: "100%", opacity: 1 }
              }
              transition={{ duration: 0.7 }}
              className="h-[1px] w-full rounded-lg bg-foreground"
            ></motion.div>
            <motion.div
              initial={{ rotate: 0, width: "100%" }}
              animate={open ? { rotate: -20, y: -4.5 } : { rotate: 0 }}
              transition={{ duration: 0.7 }}
              className="h-[1px] w-full rounded-lg bg-foreground"
            />
          </div>
        </AnimatePresence>
      </header>
    </>
  );
}

export function NavigationMenu({ session }: { session: SessionResult }) {
  return (
    <div className="z-1000 absolute top-0 left-0 right-0 bottom-0 w-[100vw] h-[100vh] bg-background/80 backdrop-blur-md border-l">
      <nav className="w-full h-full px-6 pt-20 pb-6 flex flex-col justify-between">
        <ul>
          <Link href="/">
            <li className="underline text-xl">Journal</li>
          </Link>
          <Link href="/projects">
            <li className="underline text-xl">Projects</li>
          </Link>
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
