import { isMedia } from "@workspace/ui/lib/utils";
import Image, { StaticImageData } from "next/image";

interface PreviewCardProps {
  src: string | StaticImageData;
  alt: string;
}

export default function PreviewCard({ src, alt }: PreviewCardProps) {
  const type = isMedia(src);

  return (
    <div
      className="relative overflow-hidden rounded-lg bg-gray-200"
      style={{ width: "20vw", height: "30vh" }}
    >
      {type === "image" ? (
        <Image
          src={src}
          alt={alt}
          style={{ objectFit: "cover" }}
          layout="fill"
        />
      ) : (
        <video
          src={src as string}
          className="object-cover w-full h-full"
          autoPlay
          muted
          loop
        />
      )}
    </div>
  );
}
