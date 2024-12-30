import React from "react";

import { Skeleton } from "@workspace/ui/components/shadcn/Skeleton";

const Loading = () => {
  return (
    <div className="p-4 overflow-y-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="w-[224px] h-[300px]" />
        ))}
      </div>
    </div>
  );
};

export default Loading;
