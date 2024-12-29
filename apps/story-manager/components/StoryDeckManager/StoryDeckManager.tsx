"use client";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { CircleX } from "lucide-react";

import { useStoryDeckStore } from "../../store/MediaStore.store";
import PreviewCard from "./PreviewCard";
import UploadMedia from "./UploadMedia";

export default function StoryDeckImageManager() {
  const { items, setItems } = useStoryDeckStore();

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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="carousel" direction="horizontal">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex overflow-x-auto space-x-4 p-4 border-2 rounded-lg  max-w-[70dvw] min-h-[320px] "
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="relative flex-shrink-0 "
                  >
                    <PreviewCard src={item.src as string} alt={item.alt} />

                    <CircleX
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id);
                      }}
                      className="absolute top-2 right-2 hover:bg-red-900 rounded-xl text-destructive cursor-pointer"
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <div className=" w-[200px] h-[300px]">
              <UploadMedia />
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
