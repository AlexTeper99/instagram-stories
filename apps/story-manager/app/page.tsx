import { Button } from "@workspace/ui/components/button";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Story manager</h1>
        <Button size="sm">Story manager</Button>
      </div>
    </div>
  );
}
