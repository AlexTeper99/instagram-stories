CREATE TABLE "decks" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "decks_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" text
);
--> statement-breakpoint
CREATE TABLE "stories" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "stories_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"created_at" text,
	"deckId" integer,
	"image_url" text
);
--> statement-breakpoint
ALTER TABLE "stories" ADD CONSTRAINT "stories_deckId_decks_id_fk" FOREIGN KEY ("deckId") REFERENCES "public"."decks"("id") ON DELETE cascade ON UPDATE no action;