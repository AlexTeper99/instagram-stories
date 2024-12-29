"use server";

import { getAllStories } from "@/database/actions";
import { Button } from "@workspace/ui/components/shadcn/button";
import Link from "next/link";

export default async function Page() {
  const allStories = await getAllStories();

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
