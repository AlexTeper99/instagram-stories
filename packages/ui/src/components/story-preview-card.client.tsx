"use client";

import Image, { StaticImageData } from "next/image";

interface StoryPreviewCardProps {
  username: string;
  imageUrl: string | StaticImageData;
}

export default function StoryPreviewCard({
  username,
  imageUrl,
}: StoryPreviewCardProps) {
  return (
    <div className="relative w-full h-full aspect-square rounded-lg overflow-hidden shadow-md cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-105">
      <Image
        src={imageUrl}
        alt={`${username}'s story`}
        layout="fill"
        objectFit="cover"
        className={`transition-opacity duration-200 hover:opacity-90 `}
      />
      <div
        className={`absolute inset-0 ${"bg-gradient-to-t from-transparent to-gray-800/30"}`}
      />
      <div className="absolute top-0 left-0 right-0 p-4">
        <h2 className="text-white text-lg font-bold truncate shadow-text">
          {username}
        </h2>
      </div>
    </div>
  );
}
