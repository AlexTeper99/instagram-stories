import Image, { StaticImageData } from "next/image";

interface PreviewCardProps {
  src: string | StaticImageData;
  alt: string;
}

export default function PreviewCard({ src, alt }: PreviewCardProps) {
  return (
    <div
      className="relative overflow-hidden rounded-lg bg-gray-200"
      style={{ width: "250px", height: "400px" }}
    >
      <Image src={src} alt={alt} style={{ objectFit: "cover" }} layout="fill" />
    </div>
  );
}
