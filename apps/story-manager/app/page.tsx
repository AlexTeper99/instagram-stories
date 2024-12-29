"use server";

import { Button } from "@workspace/ui/components/shadcn/button";
import Link from "next/link";

export default async function Page() {
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
