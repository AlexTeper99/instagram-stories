import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const stories = pgTable("stories", {
  id: uuid("id").primaryKey(),
  createdAt: text("created_at"),
  deckId: uuid("deckId"),
  image_url: text("image_url"),
});
