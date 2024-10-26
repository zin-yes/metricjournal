"use client";

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
import { useRef, useState } from "react";
import EntryCardWithEditModal from "./_components/entry-card";
import ModeToggle from "./_components/mode-toggle";
import { useToast } from "@/hooks/use-toast";
import { Entry } from "@/database/schema";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createEntrySchema } from "@/server/api/entry/entry.input";
import Link from "next/link";

export default function IndexPage() {
  const { toast } = useToast();

  const entryReadAllQuery = api.entry.readAll.useQuery(
    {
      limit: 50,
      cursor: 0,
    },
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    }
  );
  const entryCreateMutation = api.entry.create.useMutation({
    onSettled: () => {
      entryReadAllQuery.refetch();
    },
    onSuccess: () => {
      toast({
        title: "Entry created",
        description: "Your entry has been created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
      });
    },
  });

  const entryUpdateMutation = api.entry.update.useMutation({
    onSettled: () => {
      entryReadAllQuery.refetch();
    },
    onSuccess: () => {
      toast({
        title: "Entry updated",
        description: "Your entry has been updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
      });
    },
  });
  const entryDeleteMutation = api.entry.delete.useMutation({
    onSettled: () => {
      entryReadAllQuery.refetch();
    },
    onSuccess: () => {
      toast({
        title: "Entry deleted",
        description: "Your entry has been deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
      });
    },
  });

  const { data } = authClient.useSession();

  return (
    <main className="w-full p-4 md:p-6 min-h-[100vh] flex flex-col items-center">
      <div className="w-full flex flex-col gap-2 max-w-[700px]">
        <header>
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-xl font-bold">MetricJournal</h1>
            {data?.user ? (
              <div className="flex flex-row gap-2 items-center">
                <Button asChild variant="outline">
                  <Link href="/signout">Sign Out</Link>
                </Button>
                <Avatar>
                  <AvatarImage src={data?.user.image} />
                  <AvatarFallback>{data?.user.name?.[0]}</AvatarFallback>
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
          {data?.user.name && <span>Hello, {data?.user.name}</span>}
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
      note: "",
      title: "",
    },
  });

  function onSubmit(values: z.infer<typeof createEntrySchema>) {
    entryCreateMutation
      .mutateAsync({
        ...values,
      })
      .then(() => {
        setOpen(false);
        form.reset();
      });
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
                            className={
                              form.getFieldState<"title">("title").error
                                ? "outline-destructive border-destructive"
                                : ""
                            }
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
                          <AutosizeTextarea
                            maxLength={4096}
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
