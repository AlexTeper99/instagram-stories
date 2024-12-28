"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";

interface StoryPreviewCardProps {
  username: string;
  imageUrl: string | StaticImageData;
  hasUnviewedStory?: boolean;
}

export default function StoryPreviewCard({
  username,
  imageUrl,
  hasUnviewedStory = true,
}: StoryPreviewCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full h-full aspect-square rounded-lg overflow-hidden shadow-md cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={imageUrl}
        alt={`${username}'s story`}
        layout="fill"
        objectFit="cover"
        className={`transition-opacity duration-200 ${isHovered ? "opacity-90" : "opacity-100"}`}
      />
      <div
        className={`absolute inset-0 ${hasUnviewedStory ? "bg-gradient-to-t from-transparent to-yellow-400/30" : "bg-gradient-to-t from-transparent to-gray-800/30"}`}
      />
      <div className="absolute top-0 left-0 right-0 p-4">
        <h2 className="text-white text-lg font-bold truncate shadow-text">
          {username}
        </h2>
      </div>
      {hasUnviewedStory && (
        <div className="absolute top-2 right-2 w-3 h-3 bg-yellow-400 rounded-full" />
      )}
    </div>
  );
}
