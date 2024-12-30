import { create } from "zustand";

interface StoryDeckItem {
  id: string;
  src: string;
  alt: string;
}

interface StoryDeckStore {
  items: StoryDeckItem[];
  setItems: (items: StoryDeckItem[]) => void;
  addItem: (item: StoryDeckItem) => void;
  reset: () => void;
}

export const useStoryDeckStore = create<StoryDeckStore>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  addItem: (item: StoryDeckItem) =>
    set((state) => ({ items: [...state.items, item] })),
  reset: () => set({ items: [] }),
}));
