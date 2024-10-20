"use client";

import { createEntrySchema } from "@/server/api/routers/entry/entry.input";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Entry } from "@/server/database/schema/entires";

import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRef, useState } from "react";

export default function IndexPage() {
  const entryReadAllQuery = api.entry.readAll.useQuery(undefined, {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
  const entryCreateMutation = api.entry.create.useMutation({
    onSettled: () => {
      entryReadAllQuery.refetch();
    },
    onSuccess: () => {
      // TODO: Add toast for success
    },
    onError: (error) => {
      // TODO: Add toast for error
    },
  });

  const entryUpdateMutation = api.entry.update.useMutation({
    onSettled: () => {
      entryReadAllQuery.refetch();
    },
    onSuccess: () => {
      // TODO: Add toast for success
    },
    onError: (error) => {
      // TODO: Add toast for error
    },
  });
  const entryDeleteMutation = api.entry.delete.useMutation({
    onSettled: () => {
      entryReadAllQuery.refetch();
    },
    onSuccess: () => {
      // TODO: Add toast for success
    },
    onError: (error) => {
      // TODO: Add toast for error
    },
  });
  // TODO: Add feedback/visual indicator on refetch
  return (
    <main className="w-full p-4 min-h-[100vh]">
      <div className="w-full flex flex-col gap-2">
        <header>
          <h1 className="text-xl font-bold">MetricJournal</h1>
          <p>Live intentionally by tracking and reviewing your day.</p>
        </header>
        <div className="w-full flex flex-row gap-2">
          <ModeToggle />
          <AddEntryModalButton entryCreateMutation={entryCreateMutation} />
        </div>
        <span className="text-muted-foreground">
          {entryReadAllQuery.isRefetching && "Refetching..."}
        </span>
        {entryReadAllQuery.isSuccess ? (
          <EntryList
            entries={entryReadAllQuery.data}
            entryDeleteMutation={entryDeleteMutation}
            entryUpdateMutation={entryUpdateMutation}
          />
        ) : entryReadAllQuery.isError ? (
          <span className="text-red-500">
            Error: {entryReadAllQuery.error.message}
          </span>
        ) : (
          <span className="text-muted-foreground">Loading...</span>
        )}
      </div>
    </main>
  );
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EntryCardWithEditModal } from "./_components/entry-card";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AddEntryModalButton({
  entryCreateMutation,
}: {
  entryCreateMutation: ReturnType<typeof api.entry.create.useMutation>;
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => {
      titleInputRef.current?.focus();
    }, 100);
  };

  const form = useForm<z.infer<typeof createEntrySchema>>({
    resolver: zodResolver(createEntrySchema),
    defaultValues: {
      tags: [],
      note: "",
      title: "",
    },
  });

  function onSubmit(values: z.infer<typeof createEntrySchema>) {
    form.reset();
    entryCreateMutation
      .mutateAsync({
        ...values,
      })
      .then(() => setOpen(false));
  }

  const titleInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button onClick={handleOpen} className="w-full">
        Add entry
      </Button>

      <Credenza open={open} onOpenChange={setOpen}>
        <CredenzaContent>
          <CredenzaHeader>
            <CredenzaTitle>Add entry</CredenzaTitle>
            <CredenzaDescription>
              Add a new entry to your journal
            </CredenzaDescription>
          </CredenzaHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CredenzaBody>
              <Form {...form}>
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            maxLength={256}
                            minLength={1}
                            placeholder="Enter a title..."
                            {...field}
                            ref={titleInputRef}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Note</FormLabel>
                        <FormControl>
                          <Textarea
                            maxLength={4096}
                            minLength={1}
                            placeholder="Enter a note..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Form>
            </CredenzaBody>
            <CredenzaFooter>
              <Button type="submit">Submit</Button>
              <CredenzaClose asChild>
                <Button variant="outline">Close</Button>
              </CredenzaClose>
            </CredenzaFooter>
          </form>
        </CredenzaContent>
      </Credenza>
    </>
  );
}

function EntryList({
  entries,
  entryDeleteMutation,
  entryUpdateMutation,
}: {
  entries: Entry[];
  entryDeleteMutation: ReturnType<typeof api.entry.delete.useMutation>;
  entryUpdateMutation: ReturnType<typeof api.entry.update.useMutation>;
}) {
  return entries.map((entry) => (
    <EntryCardWithEditModal
      entryUpdateMutation={entryUpdateMutation}
      entryDeleteMutation={entryDeleteMutation}
      key={entry.id}
      entry={entry}
    />
  ));
}
