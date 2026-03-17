-- Confirmed: All migration files and schema are up to date with the contacts table present.
-- No new migration SQL needs to be generated. The following SQL is the last expected migration:

CREATE TABLE "contacts" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"team_id" text NOT NULL,
	"name" text NOT NULL,
	"company" text,
	"email" text,
	"phone" text,
	"notes" text,
	"tags" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE cascade ON UPDATE no action;