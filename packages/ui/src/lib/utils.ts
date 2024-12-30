import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { StaticImageData } from "next/image";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isMedia = (src: string | StaticImageData): string => {
  if (typeof src === "string") {
    if (src.match(/\.(jpeg|jpg|gif|png)$/) != null) {
      return "image";
    } else if (src.match(/\.(mp4|avi|mov|wmv)$/) != null) {
      return "video";
    } else {
      invariant(false, "Unsupported media type");
    }
  }
  return "image"; // Assuming StaticImageData is always an image
};

export function invariant(
  condition: unknown,
  message: string
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

export async function convertBlobUrlToFile(blobUrl: string) {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const fileName = Math.random().toString(36).slice(2, 9);
  const mimeType = blob.type || "application/octet-stream";
  const file = new File([blob], `${fileName}.${mimeType.split("/")[1]}`, {
    type: mimeType,
  });
  return file;
}
type RestType = {
  decks: {
    id: number;
    title: string;
  };
  stories: {
    id: number;
    createdAt: string;
    deckId: number;
    image_url: string;
  } | null;
}[];

type DeckWithStories = {
  deck: {
    id: number;
    title: string;
  };
  stories: {
    id: number;
    createdAt: string;
    deckId: number;
    image_url: string;
  }[];
};

export function groupByDeck(restData: RestType): DeckWithStories[] {
  const groupedData: { [deckId: number]: DeckWithStories } = {};

  for (const entry of restData) {
    const { decks, stories } = entry;

    if (!groupedData[decks.id]) {
      groupedData[decks.id] = {
        deck: {
          id: decks.id,
          title: decks.title,
        },
        stories: [],
      };
    }

    if (stories) {
      groupedData[decks.id]?.stories.push(stories);
    }
  }

  return Object.values(groupedData);
}
