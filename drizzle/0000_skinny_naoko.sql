CREATE TABLE `entries` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text(256),
	`note` text(4096),
	`tags` text DEFAULT '[]',
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
