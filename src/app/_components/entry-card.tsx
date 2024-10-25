"use client";

import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import moment from "moment";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import React, { useId, useRef, useState } from "react";
import { Entry } from "@/database/schema";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { updateEntrySchema } from "@/server/api/entry/entry.input";

export default function EntryCardWithEditModal({
  entryDeleteMutation,
  entryUpdateMutation,
  entry,
}: {
  entryDeleteMutation: ReturnType<typeof api.entry.delete.useMutation>;
  entryUpdateMutation: ReturnType<typeof api.entry.update.useMutation>;
  entry: Entry;
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => {
      titleInputRef.current?.focus();
    }, 100);
  };

  const form = useForm<z.infer<typeof updateEntrySchema>>({
    resolver: zodResolver(updateEntrySchema),
    defaultValues: {
      title: entry.title ?? "",
      note: entry.note ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof updateEntrySchema>) {
    entryUpdateMutation.mutateAsync({ ...values, id: entry.id }).then(() => {
      setOpen(false);
      form.reset();
    });
  }

  const titleInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <EntryCard entry={entry} handleOpen={handleOpen} />

      <Credenza open={open} onOpenChange={setOpen}>
        <CredenzaContent>
          <CredenzaHeader>
            <CredenzaTitle>Edit entry</CredenzaTitle>
            <CredenzaDescription>
              Edit the contents of the entry that you selected by clicking
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
                            className={
                              form.getFieldState<"note">("note").error
                                ? "outline-destructive border-destructive"
                                : ""
                            }
                            maxHeight={250}
                            minHeight={30}
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
              <EntryDeleteModal
                entry={entry}
                entryDeleteMutation={entryDeleteMutation}
                onDelete={() => {
                  setOpen(false);
                  form.reset();
                }}
              />
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

function contentToHtml(text: string) {
  return text.split("\n").map((item, index) => {
    return (
      <React.Fragment key={index}>
        {item}
        <br />
      </React.Fragment>
    );
  });
}

export function EntryCard({
  handleOpen,
  entry,
}: {
  handleOpen: () => void;
  entry: Entry;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="px-3 rounded-t-[var(--radius)] border w-fit border-b-0 h-5 flex justify-center items-end">
        <span className="text-xs text-muted-foreground">
          {moment(entry.createdAt).format("hh:mm a")}
        </span>
      </div>
      <Card onClick={() => handleOpen()} className="w-full cursor-pointer">
        <CardHeader>
          <CardTitle>{entry.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {entry.note ? (
            <ShowMore content={entry.note ?? ""} />
          ) : (
            <span className="text-muted-foreground">Click to edit...</span>
          )}
        </CardContent>
        <CardFooter>
          <span className="text-muted-foreground text-sm">
            Last edited {moment(entry.updatedAt).fromNow()}
          </span>
        </CardFooter>
      </Card>
      {entry.completedAt && (
        <div className="px-3 rounded-b-[var(--radius)] border w-fit border-t-0 h-5 flex justify-center items-center">
          <span className="text-xs text-muted-foreground">
            {moment(entry.completedAt).format("hh:mm a")}
          </span>
        </div>
      )}
    </div>
  );
}

function ShowMore({ content }: { content: string }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      {showMore
        ? contentToHtml(content)
        : contentToHtml(content.substring(0, 128))}
      {content.length > 128 && (
        <button
          onClick={(event) => {
            event.stopPropagation();
            setShowMore(!showMore);
          }}
          className="text-muted-foreground hover:font-underline"
        >
          {showMore ? "show less..." : "show more..."}
        </button>
      )}
    </>
  );
}

export function EntryDeleteModal({
  entryDeleteMutation,
  entry,
  onDelete,
}: {
  entryDeleteMutation: ReturnType<typeof api.entry.delete.useMutation>;
  onDelete: () => void;
  entry: Entry;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaTrigger asChild>
        <Button variant="secondary">Delete</Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Delete entry</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody>Are you sure you want to delete this entry?</CredenzaBody>
        <CredenzaFooter>
          <Button
            onClick={() => {
              entryDeleteMutation
                .mutateAsync({
                  id: entry.id,
                })
                .then(() => {
                  onDelete();
                  setOpen(false);
                });
            }}
            variant="destructive"
          >
            <Trash2 size={17} />
            Delete
          </Button>
          <CredenzaClose asChild>
            <Button variant="outline">Cancel</Button>
          </CredenzaClose>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
}
