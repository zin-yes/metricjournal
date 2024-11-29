import { generateUUID } from "@/utils/uuid";

import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// AUTH SCHEMA

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", {
    mode: "boolean",
  }).notNull(),
  image: text("image"),
  createdAt: integer("created_at", {
    mode: "timestamp",
  }).notNull(),
  updatedAt: integer("updated_at", {
    mode: "timestamp",
  }).notNull(),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", {
    mode: "timestamp",
  }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", {
    mode: "timestamp",
  }).notNull(),
  updatedAt: integer("updated_at", {
    mode: "timestamp",
  }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", {
    mode: "timestamp",
  }).notNull(),
  updatedAt: integer("updated_at", {
    mode: "timestamp",
  }).notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", {
    mode: "timestamp",
  }).notNull(),
  createdAt: integer("created_at", {
    mode: "timestamp",
  }),
  updatedAt: integer("updated_at", {
    mode: "timestamp",
  }),
});

// APP SCHEMA

// JOURNAL FEATURE
export const timelineEntry = sqliteTable("timeline_entry", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateUUID()),
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  title: text("title", { length: 256 }).notNull(),
  note: text("note", { length: 4096 }),
  completedAt: integer("completed_at", { mode: "timestamp_ms" }),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date()),
});

export type TimelineEntry = typeof timelineEntry.$inferSelect;
export type TimelineEntryInsert = typeof timelineEntry.$inferInsert;

// PROJECTS FEATURE

export const project = sqliteTable("project", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateUUID()),
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name", { length: 256 }).notNull(),
});

export type Project = typeof project.$inferSelect;
export type ProjectInsert = typeof project.$inferInsert;

export const projectEntry = sqliteTable("project_entry", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateUUID()),
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  projectId: text("project_id")
    .references(() => project.id, { onDelete: "cascade" })
    .notNull(),
  tags: text("tags").$type<string[]>().default([]),
  title: text("title", { length: 256 }).notNull(),
  note: text("note", { length: 4096 }),
  completedAt: integer("completed_at", { mode: "timestamp_ms" }),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date()),
});

export type ProjectEntry = typeof projectEntry.$inferSelect;
export type ProjectEntryInsert = typeof projectEntry.$inferInsert;
