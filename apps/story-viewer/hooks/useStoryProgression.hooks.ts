import { StoryViewerProps } from "@/components/StoryViewer/story";
import { useState, useEffect, useCallback } from "react";

export function useStoryProgression(users: StoryViewerProps[]) {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentUser = users[currentUserIndex];
  const currentStory = currentUser
    ? currentUser.stories[currentStoryIndex]
    : null;

  const goToNextStory = useCallback(() => {
    if (currentUser && currentStoryIndex < currentUser.stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else if (currentUserIndex < users.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
      setCurrentStoryIndex(0);
    } else {
      // Reset to the first story of the first user
      setCurrentUserIndex(0);
      setCurrentStoryIndex(0);
    }
    setProgress(0);
  }, [currentStoryIndex, currentUserIndex, users.length, currentUser]);

  const goToPreviousStory = useCallback(() => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    } else if (currentUserIndex > 0) {
      setCurrentUserIndex(currentUserIndex - 1);
      const previousUser = users[currentUserIndex - 1];
      if (previousUser) {
        setCurrentStoryIndex(previousUser.stories.length - 1);
      }
    }
    setProgress(0);
  }, [currentStoryIndex, currentUserIndex, users]);

  const pauseStory = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resumeStory = useCallback(() => {
    setIsPaused(false);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      if (currentStory && progress < 100) {
        setProgress((prev) => prev + (100 / currentStory.duration) * 100);
      } else {
        goToNextStory();
      }
    }, 100);

    return () => clearInterval(timer);
  }, [currentStory, progress, goToNextStory, isPaused]);

  return {
    currentUser,
    currentStory,
    progress,
    goToNextStory,
    goToPreviousStory,
    pauseStory,
    resumeStory,
  };
}
