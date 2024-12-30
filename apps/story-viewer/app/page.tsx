"use server";

import DeckCard from "@/components/DeckCard";
import { getDecksWithStories } from "@workspace/ui/database/actions";
import { groupByDeck } from "@workspace/ui/lib/utils";

export default async function Page() {
  const res = await getDecksWithStories().then((res) => groupByDeck(res));

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
                    : "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
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
