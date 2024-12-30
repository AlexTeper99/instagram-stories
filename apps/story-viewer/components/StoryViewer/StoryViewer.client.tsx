"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { StoryProgress } from "./StoryProgress.client";
import { useStoryProgression } from "@/hooks/useStoryProgression.hooks";
import { StoryViewerProps } from "./story";

export function StoryViewer(list: StoryViewerProps[]) {
  const {
    currentUser,
    currentStory,
    progress,
    goToNextStory,
    goToPreviousStory,
    pauseStory,
    resumeStory,
  } = useStoryProgression(list);
  const [isPaused, setIsPaused] = useState(false);

  const handlePause = () => {
    setIsPaused(true);
    pauseStory();
  };

  const handleResume = () => {
    setIsPaused(false);
    resumeStory();
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentStory?.id}
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Image
            src={currentStory?.imageUrl || "/default-image.jpg"}
            alt="Story"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

      <div className="absolute top-0 left-0 right-0">
        <StoryProgress
          stories={currentUser.stories}
          currentIndex={currentUser.stories.findIndex(
            (s: { id: string }) => s.id === currentStory.id
          )}
          progress={progress}
          isPaused={isPaused}
        />
      </div>

      <div className="absolute top-4 left-4 flex items-center space-x-2">
        <Image
          src={currentUser.avatar}
          alt={currentUser.name}
          width={40}
          height={40}
          className="rounded-full border-2 border-white"
        />
        <span className="text-white font-semibold">{currentUser.name}</span>
      </div>

      <div
        className="absolute inset-0 flex"
        onTouchStart={(e) => {
          handlePause();
          const touch = e.touches[0];
          if (!touch) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const x = touch.clientX - rect.left;
          if (x < rect.width / 2) {
            goToPreviousStory();
          } else {
            goToNextStory();
          }
        }}
        onTouchEnd={handleResume}
        onMouseDown={handlePause}
        onMouseUp={handleResume}
        onMouseLeave={handleResume}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const leftThreshold = 48; // Width of the left button area
          const rightThreshold = rect.width - 48; // Width of the right button area
          if (x > leftThreshold && x < rightThreshold) {
            if (x < rect.width / 2) {
              goToPreviousStory();
            } else {
              goToNextStory();
            }
          }
        }}
      >
        <div className="w-1/2" />
        <div className="w-1/2" />
      </div>

      <div className="absolute inset-y-0 left-0 w-12 flex items-center justify-center">
        <button
          className="w-10 h-10 bg-black/30 rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            goToPreviousStory();
          }}
        >
          <ChevronLeft size={24} />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 w-12 flex items-center justify-center">
        <button
          className="w-10 h-10 bg-black/30 rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            goToNextStory();
          }}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
