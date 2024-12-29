"use server";

import { db } from "./drizzle";
import { stories } from "./schema";

const getAllStories = async () => {
  const allStories = await db.select().from(stories);
  return allStories;
};

export { getAllStories };
