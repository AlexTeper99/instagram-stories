import Image, { StaticImageData } from "next/image";

interface PreviewCardProps {
  src: string | StaticImageData;
  alt?: string;
  width?: string;
  height?: string;
}

export default function MediaUploderCard({
  src,
  alt = "Preview Card",
  width = "200px",
  height = "300px",
}: PreviewCardProps) {
  return (
    <div
      className="relative overflow-hidden rounded-lg bg-gray-200"
      style={{ width: width, height: height }}
    >
      <Image src={src} alt={alt} style={{ objectFit: "cover" }} layout="fill" />
    </div>
  );
}
