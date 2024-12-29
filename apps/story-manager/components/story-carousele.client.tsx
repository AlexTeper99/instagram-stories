"use client";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { X } from "lucide-react";

import { useCarouselStore } from "../store/media-store";
import PreviewCard from "./preview-card";

export default function StoryCarousel() {
  const { items, setItems } = useCarouselStore();

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
            className="flex overflow-x-auto space-x-4 p-4 border-2  rounded-lg  w-[80dvw] min-h-[230px] "
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="relative flex-shrink-0 "
                    onClick={() => handleItemClick(item.id)}
                  >
                    <PreviewCard src={item.src as string} alt={item.alt} />

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id);
                      }}
                      className="absolute top-2 right-2 bg-destructive text-white p-1 rounded-full hover:bg-destructive transition-colors duration-200"
                    >
                      <X />
                    </button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
