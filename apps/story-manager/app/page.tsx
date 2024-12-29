"use server";

import { getDecksWithStories } from "@/database/actions";
import { Button } from "@workspace/ui/components/shadcn/button";
import Link from "next/link";

export default async function Page() {
  // await createDeck({
  //   title: "My first deck",
  // });

  // await createStory({
  //   image_url: "https://images.unsplash.com/photo-1634170380000-4b3b3b3b3b3b",
  //   createdAt: new Date().toDateString(),
  //   deckId: 1,
  // });

  const res = await getDecksWithStories();

  console.log(res, "get decks");

  return (
    <div className="flex items-center justify-center ">
      <div className="flex flex-col items-center justify-center gap-4">
        <Button>
          <Link href="/create-story-deck" className="px-4 py-2">
            Create your Story Deck
          </Link>
        </Button>
        {res &&
          Object.values(res).map((deck) => (
            <div key={deck.deck.id}>
              <h1>{deck.deck.title}</h1>
              <div className="flex gap-4">
                {deck.stories.map((story) => (
                  <div key={story.id}>
                    <div>{story.image_url}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
