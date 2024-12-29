import StoryCarousel from "@/components/story-carousele.client";
import ImageUploader from "@/components/upload-media.client";
import { ModeToggle } from "@workspace/ui/components/mode-toggle.client";
import { Button } from "@workspace/ui/components/shadcn/button";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Story manager</h1>
        <Button size="sm">Story manager</Button>
        <ModeToggle />
        <ImageUploader />
        <StoryCarousel />
      </div>
    </div>
  );
}
