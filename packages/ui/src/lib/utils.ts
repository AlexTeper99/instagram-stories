import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { StaticImageData } from "next/image";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isMedia = (src: string | StaticImageData): string => {
  if (typeof src === "string") {
    if (src.match(/\.(jpeg|jpg|gif|png)$/) != null) {
      return "image";
    } else if (src.match(/\.(mp4|avi|mov|wmv)$/) != null) {
      return "video";
    } else {
      invariant(false, "Unsupported media type");
    }
  }
  return "image"; // Assuming StaticImageData is always an image
};

export function invariant(
  condition: unknown,
  message: string
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}
