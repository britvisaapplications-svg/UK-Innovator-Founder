CREATE TABLE `cases` (
	`id` text PRIMARY KEY NOT NULL,
	`lead_id` text,
	`tracking_ref` text NOT NULL,
	`client_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`package_tier` text,
	`case_stage` integer DEFAULT 0 NOT NULL,
	`stage5_outcome` text,
	`case_history` text,
	`case_updated_at` integer,
	`admin_note` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `cases_tracking_ref_unique` ON `cases` (`tracking_ref`);--> statement-breakpoint
CREATE INDEX `cases_tracking_ref_idx` ON `cases` (`tracking_ref`);--> statement-breakpoint
CREATE INDEX `cases_email_idx` ON `cases` (`email`);--> statement-breakpoint
CREATE INDEX `cases_lead_id_idx` ON `cases` (`lead_id`);--> statement-breakpoint
CREATE TABLE `leads` (
	`id` text PRIMARY KEY NOT NULL,
	`full_name` text,
	`phone` text,
	`email` text NOT NULL,
	`country` text,
	`has_idea` text,
	`investment_budget` text,
	`cv_url` text,
	`cv_file_name` text,
	`status` text DEFAULT 'new' NOT NULL,
	`admin_note` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `leads_email_idx` ON `leads` (`email`);--> statement-breakpoint
CREATE INDEX `leads_status_idx` ON `leads` (`status`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`role` text DEFAULT 'user' NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);