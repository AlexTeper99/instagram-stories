"use client";

import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center ">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl text-red-700">
          An error has ocurred, please try again later{" "}
        </h1>
      </div>
    </div>
  );
};

export default Loading;
