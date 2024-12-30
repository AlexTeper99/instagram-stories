import { motion } from "framer-motion";
import { SingleStoryView } from "./story";

interface StoryProgressProps {
  stories: SingleStoryView[];
  currentIndex: number;
  progress: number;
  isPaused: boolean;
}

export function StoryProgress({
  stories,
  currentIndex,
  progress,
  isPaused,
}: StoryProgressProps) {
  return (
    <div className="flex w-full gap-1 px-2 pt-2">
      {stories.map((story, index) => (
        <div
          key={story.id}
          className="h-1 flex-1 bg-gray-300 rounded-full overflow-hidden"
        >
          {index === currentIndex ? (
            <motion.div
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
              style={{ animationPlayState: isPaused ? "paused" : "running" }}
            />
          ) : index < currentIndex ? (
            <div className="h-full w-full bg-white" />
          ) : null}
        </div>
      ))}
    </div>
  );
}
