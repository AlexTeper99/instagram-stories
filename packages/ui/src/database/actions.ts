"use server";

import { db, eq } from "./drizzle";
import {
  decksTable,
  InsertDeck,
  InsertStory,
  SelectDeck,
  storiesTable,
} from "./schema";

export async function createDeck(deckData: InsertDeck, stories: string[]) {
  // Insert the deck and get the inserted ID
  const [insertedDeck] = await db
    .insert(decksTable)
    .values(deckData)
    .returning({ id: decksTable.id });

  if (!insertedDeck) {
    throw new Error("Failed to insert deck");
  }
  const deckId = insertedDeck.id;

  // Add the deck ID to each story
  const storiesWithDeckId = stories.map((story) => ({
    image_url: story,
    deckId,
  }));

  // Insert the stories with the deck ID
  if (storiesWithDeckId.length) {
    await db.insert(storiesTable).values(storiesWithDeckId);
  }
}

export async function createStory(data: InsertStory) {
  await db.insert(storiesTable).values(data);
}

export async function getDeckById(id: SelectDeck["id"]) {
  return db.select().from(decksTable).where(eq(decksTable.id, id));
}
export async function getDecksWithStories() {
  const rows = await db
    .select({
      decks: decksTable,
    })
    .from(decksTable);

  return Promise.all(
    rows.map(async (row) => {
      const stories = await db
        .select()
        .from(storiesTable)
        .where(eq(storiesTable.deckId, row.decks.id));
      return { ...row, stories };
    })
  ).then((res) => res);
}
