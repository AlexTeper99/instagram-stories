/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { SelectDeck, StoryType } from "../database/schema";
import { LazyMotion, domAnimation } from "framer-motion";
import InstagramStoriesViewer from "./InstagramStoryViewer/InstagramStoryViwer.client";
import { CircleX } from "lucide-react";
import { deleteDeck } from "../database/actions";
import { useToast } from "../hooks/use-toast";
import { cn } from "../lib/utils";

interface Props {
  src: string;
  alt: string;
  title: string;
  stories: StoryType[];
  action: "view" | "edit";
  deckId: SelectDeck["id"];
}

const DeckCard: React.FC<Props> = ({
  src,
  alt,
  title,
  stories,
  action,
  deckId,
}) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openViewer = () => setIsViewerOpen(true);
  const closeViewer = () => setIsViewerOpen(false);
  const toast = useToast();

  const handleDelete = async (id: SelectDeck["id"]) => {
    try {
      await deleteDeck(id);
      toast.toast({
        title: "Deck Deleted",
        description: "Deck has been deleted successfully",
        variant: "default",
      });
    } catch (error) {
      toast.toast({
        title: "Error",
        description: "Failed to delete deck",
        variant: "destructive",
      });
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <div
        key={title}
        className={cn(
          "border rounded-lg overflow-hidden shadow-lg pt-5 hover:opacity-90",
          action === "view" ? "cursor-pointer" : ""
        )}
        onClick={action === "view" ? openViewer : undefined}
      >
        {action === "edit" && (
          <CircleX
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(deckId);
            }}
            className="relative top-[-5px]  left-[85%] hover:bg-red-900 rounded-xl text-destructive cursor-pointer"
          />
        )}
        <Image
          src={src}
          alt={alt}
          width={400}
          height={200}
          className="w-full h-48 object-cover min-w-[200px] min-h-[300px] "
        />
        <div className="p-2">
          <h3 className="text-lg font-semibold text-center">{title}</h3>
        </div>
      </div>
      {isViewerOpen && (
        <InstagramStoriesViewer stories={stories} onClose={closeViewer} />
      )}
    </LazyMotion>
  );
};

export default DeckCard;
