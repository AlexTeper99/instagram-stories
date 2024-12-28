import { ModeToggle } from "@workspace/ui/components/mode-toggle.client";
import { Button } from "@workspace/ui/components/shadcn/button";
import StoryPreviewCard from "@workspace/ui/components/story-preview-card.client";
import alexImage from "../../../packages/ui/assets/alex-selfie.jpg";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Story viewer</h1>
        <Button size="sm">Story viewer</Button>
        <StoryPreviewCard username="johndoe" imageUrl={alexImage} />
        <ModeToggle />
      </div>
    </div>
  );
}
