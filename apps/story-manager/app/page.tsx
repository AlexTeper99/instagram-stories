"use server";

import StoryDeckManager from "@/components/StoryDeckManager/StoryDeckManager";

export default async function Page() {
  return (
    <div className="flex items-center justify-center ">
      <div className="flex flex-col items-center justify-center gap-4">
        <StoryDeckManager />
      </div>
    </div>
  );
}
