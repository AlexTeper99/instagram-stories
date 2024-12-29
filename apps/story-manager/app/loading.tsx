import React from "react";

import { Skeleton } from "@workspace/ui/components/shadcn/Skeleton";

const Loading = () => {
  return (
    <div className="flex items-center justify-center ">
      <div className="flex flex-col items-center justify-center gap-4">
        <Skeleton className="w-[236px] h-[336px]" />
      </div>
    </div>
  );
};

export default Loading;
