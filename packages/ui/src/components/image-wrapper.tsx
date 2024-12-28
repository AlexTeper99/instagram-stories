/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface ImageWrapperProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

const ImageWrapper: React.FC<ImageWrapperProps> = ({
  src,
  alt,
  width,
  height,
  className,
  ...props
}) => {
  const isNextImageAvailable =
    typeof window !== "undefined" && !!(window as any).next;

  if (isNextImageAvailable) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const NextImage = require("next/image").default;
    return (
      <NextImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        {...props}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      {...props}
    />
  );
};

export default ImageWrapper;
