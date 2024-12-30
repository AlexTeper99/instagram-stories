"use client";
import React, { useState } from "react";
import Image from "next/image";
import { StoryType } from "../database/schema";
import { LazyMotion, domAnimation } from "framer-motion";
import InstagramStoriesViewer from "./InstagramStoryViewer/InstagramStoryViwer.client";

interface Props {
  src: string;
  alt: string;
  title: string;
  stories: StoryType[];
}

const DeckCard: React.FC<Props> = ({ src, alt, title, stories }) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openViewer = () => setIsViewerOpen(true);
  const closeViewer = () => setIsViewerOpen(false);

  return (
    <LazyMotion features={domAnimation}>
      <div
        key={title}
        className="border rounded-lg overflow-hidden shadow-lg"
        onClick={openViewer}
      >
        <Image
          src={src}
          alt={alt}
          width={400}
          height={200}
          className="w-full h-48 object-cover min-w-[200px] min-h-[300px]"
        />
        <div className="p-2">
          <h3 className="text-lg font-semibold text-center">{title}</h3>
        </div>
      </div>
      {isViewerOpen && (
        <InstagramStoriesViewer stories={stories} onClose={closeViewer} />
      )}
    </LazyMotion>
  );
};

export default DeckCard;
