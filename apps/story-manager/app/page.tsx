import StoryCarousel from "@/components/story-carousele.client";
import ImageUploader from "@/components/upload-media.client";

export default function Page() {
  return (
    <div className="flex items-center justify-center ">
      <div className="flex flex-col items-center justify-center gap-4">
        <ImageUploader />
        <StoryCarousel />
      </div>
    </div>
  );
}
