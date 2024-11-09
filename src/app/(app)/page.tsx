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
import { useToast } from "@/hooks/use-toast";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { createTimelineEntrySchema } from "@/services/timeline/modules/entry.input";
import moment from "moment";
import { TimelineEntry } from "@/database/schema";
import ModeToggle from "./_components/mode-toggle";
import TimelineEntryCardWithEditModal, {
  TimelineEntryCardSkeleton,
} from "./_components/entry-card";
import { Connector } from "./_components/connector";

// TODO: Refactor page and split different parts into components of their own.
// TODO: Start/set the created at time to when the add entry modal is opened. Then also record how long it takes from when the user starts writing to when they stop.
export default function AppPageComponent() {
  const { toast } = useToast();

  const entryReadAllQuery = api.timeline.entry.readAll.useQuery(
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

  const entryCreateMutation = api.timeline.entry.create.useMutation({
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
        title: "An error occured",
        description: error.message,
      });
    },
  });

  const entryUpdateMutation = api.timeline.entry.update.useMutation({
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
        title: "An error occured",
        description: error.message,
      });
    },
  });
  const entryDeleteMutation = api.timeline.entry.delete.useMutation({
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
        title: "An error occured",
        description: error.message,
      });
    },
  });

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex flex-col gap-2 max-w-[800px]">
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
          <div>
            <div className="w-full flex flex-col gap-0 mt-[20px]">
              <TimelineEntryCardSkeleton />
              <Connector />
              <TimelineEntryCardSkeleton />
              <Connector />
              <TimelineEntryCardSkeleton />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AddEntryModalButton({
  entryCreateMutation,
}: {
  entryCreateMutation: ReturnType<typeof api.timeline.entry.create.useMutation>;
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => {
      titleInputRef.current?.focus();
    }, 100);
  };

  const form = useForm<z.infer<typeof createTimelineEntrySchema>>({
    resolver: zodResolver(createTimelineEntrySchema),
    defaultValues: {
      note: "",
      title: "",
    },
  });

  function onSubmit(values: z.infer<typeof createTimelineEntrySchema>) {
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

// TODO: Split and sort the entires by days and have the day of the week as the header.
function EntryList({
  entries,
  entryDeleteMutation,
  entryUpdateMutation,
}: {
  entries: TimelineEntry[];
  entryDeleteMutation: ReturnType<typeof api.timeline.entry.delete.useMutation>;
  entryUpdateMutation: ReturnType<typeof api.timeline.entry.update.useMutation>;
}) {
  return (
    <div className="w-full flex flex-col gap-0">
      {entries.map((entry, index) => (
        <div key={entry.id}>
          <TimelineEntryCardWithEditModal
            entryUpdateMutation={entryUpdateMutation}
            entryDeleteMutation={entryDeleteMutation}
            key={entry.id}
            entry={entry}
          />
          {index !== entries.length - 1 && (
            <Connector
              text={`${moment
                .duration(
                  entries[index].createdAt.getTime() -
                    entries[index + 1].createdAt.getTime()
                )
                .humanize()} later...`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
