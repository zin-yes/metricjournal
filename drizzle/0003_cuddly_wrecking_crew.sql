PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_entries` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text(256) NOT NULL,
	`note` text(4096) NOT NULL,
	`tags` text DEFAULT '[]',
	`completed_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_entries`("id", "title", "note", "tags", "completed_at", "created_at", "updated_at") SELECT "id", "title", "note", "tags", "completed_at", "created_at", "updated_at" FROM `entries`;--> statement-breakpoint
DROP TABLE `entries`;--> statement-breakpoint
ALTER TABLE `__new_entries` RENAME TO `entries`;--> statement-breakpoint
PRAGMA foreign_keys=ON;