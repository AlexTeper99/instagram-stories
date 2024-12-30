import { pgTable, text, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const decksTable = pgTable("decks", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
});

export const deckRelation = relations(decksTable, ({ many }) => ({
  posts: many(storiesTable),
}));

export const storiesTable = pgTable("stories", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
  deckId: integer("deckId")
    .references(() => decksTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  image_url: text("image_url").notNull(),
});

export const postsRelations = relations(storiesTable, ({ one }) => ({
  creator: one(decksTable, {
    fields: [storiesTable.deckId],
    references: [decksTable.id],
  }),
}));

export type InsertDeck = typeof decksTable.$inferInsert;
export type InsertStory = typeof storiesTable.$inferInsert;

export type SelectDeck = typeof decksTable.$inferSelect;
export type SelectStory = typeof storiesTable.$inferSelect;
