"use server";

import DeckCard from "@/components/DeckCard";
import { getDecksWithStories } from "@workspace/ui/database/actions";

export default async function Page() {
  const res = await getDecksWithStories();

  if (!res || res.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <p>No decks available.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {res.map((elem) => (
            <div key={elem.decks.id}>
              <DeckCard
                src={
                  elem.stories[0]
                    ? elem.stories[0].image_url
                    : " https://via.placeholder.com/300"
                }
                alt={elem.decks.title}
                title={elem.decks.title}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
