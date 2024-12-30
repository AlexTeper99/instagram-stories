"use server";

import { getDecksWithStories } from "@workspace/ui/database/actions";
import Image from "next/image";

export default async function Page() {
  const res = await getDecksWithStories();

  const sampleCards = Object.values(res)
    .map(
      (deck, key) =>
        deck.stories[0] && {
          id: key.toString(),
          imageUrl: deck.stories[0].image_url!,
          title: deck.deck.title!,
        }
    )
    .filter((card): card is CardData => card !== undefined);

  return (
    <div>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <ImageGrid cards={sampleCards} />
      </div>
    </div>
  );
}

export interface CardData {
  id: string;
  imageUrl: string;
  title: string;
}

export interface CardWithImageProps {
  data: CardData;
}

export interface ImageGridProps {
  cards: CardData[];
}

function ImageGrid({ cards }: ImageGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {cards.map((card) => (
        <CardWithImage key={card.id} data={card} />
      ))}
    </div>
  );
}

function CardWithImage({ data }: CardWithImageProps) {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
      <Image
        src={data.imageUrl}
        alt={data.title}
        width={400}
        height={400}
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4">
        <h3 className="text-xl font-bold text-white">{data.title}</h3>
      </div>
    </div>
  );
}
