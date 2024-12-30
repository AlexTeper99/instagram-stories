export interface SingleStoryView {
  id: string;
  imageUrl: string;
  duration: number;
}

export interface StoryViewerProps {
  id: string;
  name: string;
  avatar: string;
  stories: SingleStoryView[];
}
