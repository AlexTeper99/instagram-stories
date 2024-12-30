import React from "react";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  title: string;
}

const DeckCard: React.FC<Props> = ({ src, alt, title }) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
      <Image
        src={src}
        alt={alt}
        width={400}
        height={400}
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4">
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
    </div>
  );
};

export default DeckCard;