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
  }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", {
    mode: "timestamp",
  })
    .$onUpdateFn(() => new Date())
    .$defaultFn(() => new Date()),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", {
    mode: "timestamp",
  }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  expiresAt: integer("expires_at", {
    mode: "timestamp",
  }),
  password: text("password"),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", {
    mode: "timestamp",
  }).notNull(),
});

// APP SCHEMA
export const entry = sqliteTable("entry", {
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

export type Entry = typeof entry.$inferSelect;
