import { StaticImageData } from "next/image";
import { create } from "zustand";

interface CarouselItem {
  id: string;
  src: string | StaticImageData;
  alt: string;
}

interface CarouselStore {
  items: CarouselItem[];
  setItems: (items: CarouselItem[]) => void;
  addItem: (item: CarouselItem) => void;
}

export const useCarouselStore = create<CarouselStore>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  addItem: (item: CarouselItem) =>
    set((state) => ({ items: [...state.items, item] })),
}));
