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
import { Textarea } from "@/components/ui/textarea";
import { updateEntrySchema } from "@/server/api/routers/entry/entry.input";
import { Entry } from "@/server/database/schema/entires";
import { Trash2 } from "lucide-react";
import { useRef, useState } from "react";

export default function EntryCardWithEditModal({
  entryDeleteMutation,
  entryUpdateMutation,
  entry,
}: {
  entryUpdateMutation: ReturnType<typeof api.entry.update.useMutation>;
  entryDeleteMutation: ReturnType<typeof api.entry.delete.useMutation>;
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
      tags: entry.tags,
      note: entry.note,
      title: entry.title,
    },
  });

  function onSubmit(values: z.infer<typeof updateEntrySchema>) {
    console.log("on submit");
    entryUpdateMutation.mutate({ ...values, id: entry.id });
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
              <EntryDeleteModal
                entry={entry}
                entryDeleteMutation={entryDeleteMutation}
                onDelete={() => setOpen(false)}
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

export function EntryCard({
  handleOpen,
  entry,
}: {
  handleOpen: () => void;
  entry: Entry;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className=" px-3 rounded-t-2xl border w-fit border-b-0">
        <span className="text-xs text-muted-foreground">
          {moment(entry.createdAt).format("hh:mm a")}
        </span>
      </div>
      <Card onClick={() => handleOpen()} className="w-full cursor-pointer">
        <CardHeader>
          <CardTitle>{entry.title}</CardTitle>
        </CardHeader>
        <CardContent>{entry.note}</CardContent>
        <CardFooter>
          <span className="text-muted-foreground">
            Last edited {moment(entry.updatedAt).fromNow()}
          </span>
        </CardFooter>
      </Card>
      <div className=" px-3 rounded-b-2xl border w-fit border-t-0">
        <span className="text-xs text-muted-foreground">
          {entry.completedAt
            ? moment(entry.completedAt).format("hh:mm a")
            : "Incomplete"}
        </span>
      </div>
    </div>
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
                  setOpen(false);
                  onDelete();
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
