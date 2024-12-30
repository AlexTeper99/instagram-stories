"use client";

import Image from "next/image";

interface Props {
  title: string;
  imageUrl: string;
  alt: string;
}

export default function StoryPreviewCard({ title, imageUrl, alt }: Props) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
      </div>

      <Image
        className="rounded-t-lg"
        src={imageUrl}
        alt={alt}
        width={100}
        height={100}
        objectFit="cover"
      />
    </div>
  );
}
