"use server";

import DeckCard from "@/components/DeckCard";
import { getDecksWithStories } from "@workspace/ui/database/actions";
import { groupByDeck } from "@workspace/ui/lib/utils";

export default async function Page() {
  const res = await getDecksWithStories()
    .then((data) => groupByDeck(data))
    .catch((error) => {
      console.error("Error fetching decks with stories:", error);
      return [];
    });

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
          {res.map(({ deck, stories }, key) => (
            <div key={key}>
              <DeckCard
                src={
                  stories[0]
                    ? stories[0].image_url
                    : " https://via.placeholder.com/300"
                }
                alt={deck.title}
                title={deck.title}
              />
            </div>
          ))}
          {/* {res.map(({ imageCover, deck }, key) => (
            <div key={key}>
              {imageCover && (
                <DeckCard
                  src={imageCover}
                  alt={deck.title}
                  title={deck.title}
                />
              )}
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}
