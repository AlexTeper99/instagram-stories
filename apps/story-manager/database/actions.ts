"use server";

import { db, eq } from "./drizzle";
import {
  decksTable,
  InsertDeck,
  InsertStory,
  SelectDeck,
  storiesTable,
} from "./schema";

export async function createDeck(data: InsertDeck) {
  await db.insert(decksTable).values(data);
}

export async function createStory(data: InsertStory) {
  await db.insert(storiesTable).values(data);
}

export async function getDeckById(id: SelectDeck["id"]) {
  return db.select().from(decksTable).where(eq(decksTable.id, id));
}

// export async function getUsersWithPostsCount(
//   page = 1,
//   pageSize = 5
// ): Promise<
//   Array<{
//     postsCount: number;
//     id: number;
//     name: string;
//     age: number;
//     email: string;
//   }>
// > {
//   return db
//     .select({
//       ...getTableColumns(usersTable),
//       postsCount: count(postsTable.id),
//     })
//     .from(usersTable)
//     .leftJoin(postsTable, eq(usersTable.id, postsTable.userId))
//     .groupBy(usersTable.id)
//     .orderBy(asc(usersTable.id))
//     .limit(pageSize)
//     .offset((page - 1) * pageSize);
// }

export async function getStoriesFromDeck(id: SelectDeck["id"]) {
  return db.select().from(storiesTable).where(eq(storiesTable.deckId, id));
}
