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
  CardDescription,
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
import { Clock, Trash2 } from "lucide-react";
import React, { useId, useMemo, useRef, useState } from "react";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { TimePickerInput } from "@/components/ui/time-picker-input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { TimelineEntry } from "@/database/schema";
import { updateTimelineEntrySchema } from "@/services/timeline/modules/entry.input";

// TODO: Retroactively be able to easily add entries.

export function TimelineEntryCardSkeleton() {
  return (
    <div className="flex flex-col items-center">
      <div className="px-3 rounded-t-[var(--radius)] border w-fit border-b-0 h-5 flex justify-center items-end">
        <span className="h-4 w-12"></span>
      </div>
      <Card className="w-full cursor-pointer">
        <CardHeader className={"pb-0"}>
          <CardTitle>
            <Skeleton className="w-40 h-4" />
          </CardTitle>
        </CardHeader>

        <div className="flex flex-wrap gap-2 border-b border-t my-6 p-6 py-4">
          <Skeleton className="w-12 h-4 px-2.5 py-0.5 rounded-xl text-xs bg-muted" />
          <Skeleton className="w-24 h-4 px-2.5 py-0.5 rounded-xl text-xs bg-muted" />
          <Skeleton className="w-16 h-4 px-2.5 py-0.5 rounded-xl text-xs bg-muted" />
        </div>

        <CardContent className={"mt-1 mb-2"}>
          <Skeleton className="w-full h-4" />
        </CardContent>
        <CardFooter>
          <Skeleton className="w-40 h-4" />
        </CardFooter>
      </Card>
    </div>
  );
}

export default function TimelineEntryCardWithEditModal({
  entryDeleteMutation,
  entryUpdateMutation,
  entry,
}: {
  entryDeleteMutation: ReturnType<typeof api.timeline.entry.delete.useMutation>;
  entryUpdateMutation: ReturnType<typeof api.timeline.entry.update.useMutation>;
  entry: TimelineEntry;
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => {
      titleInputRef.current?.focus();
    }, 100);
  };

  const form = useForm<z.infer<typeof updateTimelineEntrySchema>>({
    resolver: zodResolver(updateTimelineEntrySchema),
    defaultValues: {
      title: entry.title ?? "",
      note: entry.note ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof updateTimelineEntrySchema>) {
    entryUpdateMutation
      .mutateAsync({
        id: entry.id,
        title: form.getValues().title,
        note: form.getValues().note,
        completedAt: form.getValues().completedAt,
      })
      .then(() => {
        setOpen(false);
        form.reset();
      });
  }

  const titleInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <>
      <TimelineEntryCard entry={entry} handleOpen={handleOpen} />
      <Credenza open={open} onOpenChange={setOpen}>
        <CredenzaContent>
          <CredenzaHeader>
            <CredenzaTitle>Edit entry</CredenzaTitle>
            <CredenzaDescription>
              Edit the contents of the entry that you selected by clicking
            </CredenzaDescription>
          </CredenzaHeader>
          <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)}>
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
                  {/* <FormField
                    control={form.control}
                    name="completedAt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Completed at</FormLabel>
                        <FormControl>
                          <TimePickerDemo
                            date={field.value ?? new Date()}
                            setDate={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                </div>
              </Form>
            </CredenzaBody>
            <CredenzaFooter>
              <Button
                disabled={entryUpdateMutation.isPending}
                onClick={() => {
                  entryUpdateMutation
                    .mutateAsync({
                      id: entry.id,
                      title: form.getValues().title,
                      note: form.getValues().note,
                      completedAt: null,
                    })
                    .then(() => {
                      setOpen(false);
                    });
                }}
              >
                {entryUpdateMutation.isPending ? "Updating..." : "Submit"}
              </Button>
              <TimelineEntryDeleteModal
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
const TAG_MAX_LENGTH = 64;

function getTags(text: string) {
  return text
    .split(/(\s|\n)/)
    .filter((word) => word.startsWith("#") && word.length - 1 < TAG_MAX_LENGTH);
}

function getAllTags(text: string) {
  const words = text.split(/(\s|\n)/);
  const result: string[] = [];
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (word.startsWith("#") && word.length - 1 < TAG_MAX_LENGTH) {
      if (!result.includes(word)) {
        result.push(word);
      }
    }
  }
  return result;
}

// FIXME: TODO: add tags in the back-end to data model to make searching more efficient in the future.
// FEATURE: Add a preference from the user to always show more, or to ask.
export function TimelineEntryCard({
  handleOpen,
  entry,
}: {
  handleOpen: () => void;
  entry: TimelineEntry;
}) {
  const tags = useMemo<string[]>(
    () => getAllTags((entry.note ?? "") + " " + entry.title).toSorted(),
    [entry.note, entry.title]
  );

  return (
    <div className="flex flex-col items-center">
      <div className="px-3 rounded-t-[var(--radius)] border w-fit border-b-0 h-5 flex justify-center items-end ">
        <span className="text-xs text-muted-foreground">
          {moment(entry.createdAt).format("hh:mm a")}
        </span>
      </div>
      <Card onClick={() => handleOpen()} className="w-full cursor-pointer">
        <CardHeader className={tags.length > 0 ? "pb-0" : ""}>
          <CardTitle>
            {entry.title.split(/(\s|\n)/).map((word, index) => (
              <React.Fragment key={"word-" + index}>
                {word.startsWith("#") && word.length - 1 < TAG_MAX_LENGTH ? (
                  <span className="text-muted-foreground hover:underline">
                    {word}
                  </span>
                ) : (
                  word + " "
                )}
              </React.Fragment>
            ))}
          </CardTitle>
        </CardHeader>

        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-2 border-b border-t my-6 p-6 py-4">
            {tags.map((tag) => (
              <div
                key={tag}
                className="px-2.5 py-0.5 rounded-xl text-xs bg-muted"
              >
                {tag}
              </div>
            ))}
          </div>
        ) : null}

        <CardContent className={tags.length > 0 ? "" : "border-t pt-6"}>
          {entry.note && entry.note.length > 0 ? (
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
    <div>
      <div className={showMore ? "" : "line-clamp-5"}>
        {content.split("\n").map((item, index) => {
          return (
            <React.Fragment key={index}>
              {item.split(/(\s|\n)/).map((word, index) => (
                <React.Fragment key={"word-" + index}>
                  {word.startsWith("#") && word.length - 1 < TAG_MAX_LENGTH ? (
                    <span className="text-muted-foreground hover:underline">
                      {word}
                    </span>
                  ) : (
                    word + " "
                  )}
                </React.Fragment>
              ))}
              <br />
            </React.Fragment>
          );
        })}
      </div>
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
    </div>
  );
}

export function TimelineEntryDeleteModal({
  entryDeleteMutation,
  entry,
  onDelete,
}: {
  entryDeleteMutation: ReturnType<typeof api.timeline.entry.delete.useMutation>;
  onDelete: () => void;
  entry: TimelineEntry;
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

interface TimePickerDemoProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function TimePickerDemo({ date, setDate }: TimePickerDemoProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-end gap-2">
      <div className="grid gap-1 text-center">
        <Label htmlFor="hours" className="text-xs">
          Hours
        </Label>
        <TimePickerInput
          picker="hours"
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="minutes" className="text-xs">
          Minutes
        </Label>
        <TimePickerInput
          picker="minutes"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => secondRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="seconds" className="text-xs">
          Seconds
        </Label>
        <TimePickerInput
          picker="seconds"
          date={date}
          setDate={setDate}
          ref={secondRef}
          onLeftFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className="flex h-10 items-center">
        <Clock className="ml-2 h-4 w-4" />
      </div>
    </div>
  );
}
