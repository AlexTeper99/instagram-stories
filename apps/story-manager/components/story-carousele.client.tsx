"use client";

import { useState } from "react";
import Image from "next/image";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { X } from "lucide-react";
import alexImage from "../../../packages/ui/assets/alex-selfie.jpg";

import { StaticImageData } from "next/image";

interface CarouselItem {
  id: string;
  src: string | StaticImageData;
  alt: string;
}

export default function ImageCarousel() {
  const [items, setItems] = useState<CarouselItem[]>([
    {
      id: "1",
      src: alexImage,
      alt: "Image 1",
    },
    {
      id: "2",
      src: alexImage,
      alt: "Image 2",
    },
    {
      id: "3",
      src: alexImage,
      alt: "Image 3",
    },
    {
      id: "4",
      src: alexImage,
      alt: "Image 4",
    },
    {
      id: "5",
      src: alexImage,
      alt: "Image 5",
    },
    {
      id: "6",
      src: alexImage,
      alt: "Image 1",
    },
    {
      id: "7",
      src: alexImage,
      alt: "Image 2",
    },
    {
      id: "8",
      src: alexImage,
      alt: "Image 3",
    },
    {
      id: "9",
      src: alexImage,
      alt: "Image 4",
    },
    {
      id: "10",
      src: alexImage,
      alt: "Image 5",
    },
  ]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    if (reorderedItem) {
      newItems.splice(result.destination.index, 0, reorderedItem);
    }

    setItems(newItems);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleItemClick = (id: string) => {
    console.log(`Clicked item with id: ${id}`);
    // Add your click handler logic here
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="carousel" direction="horizontal">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex overflow-x-auto space-x-4 p-4 bg-gray-100 rounded-lg"
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="relative flex-shrink-0"
                    onClick={() => handleItemClick(item.id)}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={200}
                      height={200}
                      className="rounded-lg shadow-md cursor-pointer"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors duration-200"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
            <div className="rounded-lg shadow-md cursor-pointer w-full h-[60px]">
              Add
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
