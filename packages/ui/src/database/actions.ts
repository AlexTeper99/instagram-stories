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
      stories: storiesTable,
    })
    .from(decksTable)
    .leftJoin(storiesTable, eq(decksTable.id, storiesTable.deckId));

  type DeckWithImages = {
    deck: SelectDeck;
    stories: SelectStory[];
    imageCover: string;
  };

  const deckWithImagesMap: Record<string, DeckWithImages> = {};

  rows.forEach((row) => {
    const deck = row.decks;
    const story = row.stories;
    const deckId = deck.id;

    if (!deckWithImagesMap[deckId] && story.image_url) {
      deckWithImagesMap[deckId] = {
        deck,
        stories: [],
        imageCover: story.image_url,
      };
    }

    if (story) {
      deckWithImagesMap[deckId].stories.push(story);
      if (!deckWithImagesMap[deckId].imageCover && story.image_url) {
        deckWithImagesMap[deckId].imageCover = story.image_url;
      }
    }
  });

  return Object.values(deckWithImagesMap);
}
