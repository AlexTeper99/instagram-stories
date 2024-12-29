import { useStoryDeckStore } from "@/store/MediaStore.store";
import { CirclePlus } from "lucide-react";
import { useRef } from "react";

interface UploadedImage {
  id: string;
  url: string;
  name: string;
}

export default function UploadMedia() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { addItem } = useStoryDeckStore();

  const handleClick = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      const newImage: UploadedImage = {
        id: Date.now().toString(),
        url: URL.createObjectURL(event.target.files[0]),
        name: event.target.files[0].name,
      };
      addItem({
        id: newImage.id,
        src: newImage.url,
        alt: newImage.name,
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className=" w-[200px] h-[300px] flex items-center justify-center ">
      <button
        onClick={handleClick}
        className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent transition-colors duration-200"
      >
        <CirclePlus size={"40px"} />
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          onSubmit={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
      </button>
    </div>
  );
}
