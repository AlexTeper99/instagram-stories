"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { StoryType } from "@workspace/ui/database/schema";
import { invariant } from "@workspace/ui/lib/utils";

interface InstagramStoriesViewerProps {
  stories: StoryType[];
  onClose: () => void;
}

const STORY_DURATION = 5000; // 5 seconds per story

export default function InstagramStoriesViewer({
  stories,
  onClose,
}: InstagramStoriesViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const touchStartX = useRef(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!e.touches[0]) return;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!e.changedTouches[0]) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < stories.length - 1) {
        nextStory();
      } else if (diff < 0 && currentIndex > 0) {
        previousStory();
      }
    }
  };

  const nextStory = useCallback(() => {
    if (currentIndex < stories.length - 1) {
      setDirection(1);
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setProgress(0);
    }
  }, [currentIndex, stories.length]);

  const previousStory = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setProgress(0);
    }
  };

  useEffect(() => {
    if (!isPaused) {
      progressIntervalRef.current = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(progressIntervalRef.current as NodeJS.Timeout);
            if (currentIndex < stories.length - 1) {
              nextStory();
              return 0;
            } else {
              // Instead of calling onClose directly, use a timeout to avoid the React error
              setTimeout(onClose, 0);
              return 100;
            }
          }
          return prevProgress + (100 / STORY_DURATION) * 100;
        });
      }, 100);
    } else {
      clearInterval(progressIntervalRef.current as NodeJS.Timeout);
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [currentIndex, isPaused, stories.length, onClose, nextStory]);

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.5,
        rotateY: direction > 0 ? 45 : -45,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.5,
        rotateY: direction < 0 ? 45 : -45,
      };
    },
  };

  if (!stories || stories.length === 0) invariant(false, "No stories provided");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative w-full h-full max-w-3xl max-h-[80vh] overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          {stories[currentIndex]?.image_url && (
            <motion.img
              key={currentIndex}
              src={stories[currentIndex]?.image_url}
              alt={`Story ${currentIndex + 1}`}
              className="absolute w-full h-full object-contain"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.4 },
                rotateY: { duration: 0.4 },
              }}
            />
          )}
        </AnimatePresence>
        <div
          className="absolute inset-0 flex flex-col justify-between"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="w-full flex p-2 z-10 "
            onMouseUp={() => setIsPaused(false)}
            onMouseDown={() => setIsPaused(true)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {stories?.map((_, index) => (
              <div key={index} className="flex-1 h-1 bg-gray-500 mx-1">
                <motion.div
                  className="h-full bg-white"
                  initial={{ width: "0%" }}
                  animate={{
                    width:
                      index === currentIndex
                        ? `${progress}%`
                        : index < currentIndex
                          ? "100%"
                          : "0%",
                  }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-[30%] h-full bg-opacity-50 p-2 hover:bg-neutral-900 hover:bg-opacity-[0.02]"
          onClick={previousStory}
        />

        <button
          className="absolute right-4 top-[60%] transform -translate-y-1/2 z-20 p-2 focus:outline-none h-[98%] w-[30%]  hover:bg-neutral-900 hover:bg-opacity-[0.02]"
          onClick={nextStory}
        />

        <button
          className="absolute bottom-[30%] left-1/2 transform -translate-x-1/2 z-20  p-2 focus:outline-none transition-opacity w-[200px] h-[200px]  hover:bg-neutral-900 hover:bg-opacity-[0.02]"
          onMouseUp={() => setIsPaused(false)}
          onMouseDown={() => setIsPaused(true)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        />
        <button
          className="absolute top-4 right-4 z-21 bg-opacity-50 rounded-full p-2 focus:outline-none transition-opacity duration-300 hover:bg-opacity-75 cursor-pointer"
          onClick={onClose}
          style={{ zIndex: 1000 }}
        >
          <X className="text-white w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
