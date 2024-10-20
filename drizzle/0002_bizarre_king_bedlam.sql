CREATE TABLE `entries` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text(256) NOT NULL,
	`note` text(4096),
	`tags` text DEFAULT '[]',
	`completed_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
