"use server";

import { getDecksWithStories } from "@workspace/ui/database/actions";
import Image from "next/image";

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
    <div className="p-4  overflow-y-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {res.map((elem, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden shadow-lg"
          >
            <Image
              src={elem.stories?.[0]?.image_url || "/placeholder.png"}
              alt={elem.decks.title}
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-2">
              <h3 className="text-lg font-semibold text-center">
                {elem.decks.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
