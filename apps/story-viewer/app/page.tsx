"use server";

import DeckCard from "@/components/DeckCard";
import { getDecksWithStories } from "@workspace/ui/database/actions";

export default async function Page() {
  const res = await getDecksWithStories();

  return (
    <div>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {Object.values(res).map(({ imageCover, deck }, key) => (
            <DeckCard
              key={key}
              src={imageCover}
              alt={deck.title!}
              title={deck.title!}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
