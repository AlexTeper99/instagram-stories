"use server";

import { db, eq } from "./drizzle";
import {
  decksTable,
  InsertDeck,
  InsertStory,
  SelectDeck,
  SelectStory,
  storiesTable,
} from "./schema";

export async function createDeck(deckData: InsertDeck, stories: InsertStory[]) {
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
    ...story,
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
      stories: storiesTable,
    })
    .from(decksTable)
    .leftJoin(storiesTable, eq(decksTable.id, storiesTable.deckId))
    .groupBy(decksTable.id, storiesTable.id);

  const result = rows.reduce(
    (acc, row) => {
      const deck = row.decks;
      const story = row.stories;

      if (!acc[deck.id]) {
        acc[deck.id] = {
          deck,
          stories: [],
          imageCover: null,
        };
      }

      if (story) {
        acc[deck.id].stories.push(story);
        if (!acc[deck.id].imageCover && story.image_url) {
          acc[deck.id].imageCover = story.image_url;
        }
      }

      return acc;
    },
    {} as Record<
      string,
      {
        deck: SelectDeck;
        stories: SelectStory[];
        imageCover: string;
      }
    >
  );

  return result;
}

// export async function getStoriesFromDeck(id: SelectDeck["id"]) {
//   return db.select().from(storiesTable).where(eq(storiesTable.deckId, id));
// }
