"use server";

import { Button } from "@workspace/ui/components/shadcn/button";
import Link from "next/link";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { stories } from "@/database/schema";

export default async function Page() {
  const connectionString = process.env.DATABASE_URL;
  console.log(connectionString, "connection string");

  // Disable prefetch as it is not supported for "Transaction" pool mode
  const client = postgres(connectionString!, { prepare: false });
  const db = drizzle(client);

  const allStories = await db.select().from(stories);

  console.log(allStories, "all stories");

  return (
    <div className="flex items-center justify-center ">
      <div className="flex flex-col items-center justify-center gap-4">
        <Button>
          <Link href="/create-story-deck" className="px-4 py-2">
            Create your Story Deck
          </Link>
        </Button>
      </div>
    </div>
  );
}
