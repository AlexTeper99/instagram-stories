import React from "react";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  title: string;
}

const DeckCard: React.FC<Props> = ({ src, alt, title }) => {
  return (
    <div key={title} className="border rounded-lg overflow-hidden shadow-lg">
      <Image
        src={src}
        alt={alt}
        width={400}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-2">
        <h3 className="text-lg font-semibold text-center">{title}</h3>
      </div>
    </div>
  );
};

export default DeckCard;
