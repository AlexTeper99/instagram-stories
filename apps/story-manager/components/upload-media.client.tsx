"use client";

import { useCarouselStore } from "@/store/media-store";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "@workspace/ui/components/shadcn/button";
import { Input } from "@workspace/ui/components/shadcn/input";
import Image from "next/image";
import { useState, useRef } from "react";

interface UploadedImage {
  id: string;
  url: string;
  name: string;
}

export default function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addItem } = useCarouselStore();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedImage) {
      const newImage: UploadedImage = {
        id: Date.now().toString(),
        url: URL.createObjectURL(selectedImage),
        name: selectedImage.name,
      };
      //   setUploadedImages((prevImages) => [...prevImages, newImage]);
      addItem({
        id: newImage.id,
        src: newImage.url,
        alt: newImage.name,
      });
      setSelectedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Select an image to upload</Label>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="mt-1"
          />
        </div>

        {selectedImage && (
          <div className="mt-4">
            <p className="text-sm text-gray-500">Preview:</p>
            <Image
              src={URL.createObjectURL(selectedImage)}
              alt="Preview"
              className="mt-2 max-w-full h-auto rounded-lg"
              width={40}
              height={40}
            />
          </div>
        )}

        <Button type="submit" disabled={!selectedImage}>
          Upload Image
        </Button>
      </form>
    </div>
  );
}
