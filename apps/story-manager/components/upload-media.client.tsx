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
    <div className="rounded-lg w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-row items-end w-full gap-2">
          <div>
            <Label className="text-foreground">Select an image to upload</Label>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="mt-1"
            />
          </div>

          <Button type="submit" disabled={!selectedImage}>
            Upload Image
          </Button>
        </div>

        {/* {selectedImage && (
          <div className="mt-4">
            <p className="text-sm text-gray-500">Preview:</p>
            <Image
              src={URL.createObjectURL(selectedImage)}
              alt="Preview"
              className="mt-2 rounded-lg"
              width={60}
              height={60}
            />
          </div>
        )} */}
      </form>
    </div>
  );
}
