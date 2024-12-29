"use server";

import StoryDeckForm from "@/components/StoryDeckManager/StoryDeckForm.client";
import StoryDeckImageManager from "@/components/StoryDeckManager/StoryDeckManager";

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      <StoryDeckForm />
      <StoryDeckImageManager />
    </div>
  );
}
