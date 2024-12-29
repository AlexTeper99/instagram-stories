"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/shadcn/button";
import { Input } from "@workspace/ui/components/shadcn/input";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/shadcn/form";
import { useToast } from "@workspace/ui/hooks/use-toast";
import { useStoryDeckStore } from "@/store/MediaStore.store";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
});

const StoryDeckForm = () => {
  const { items, reset } = useStoryDeckStore();
  const toast = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data, "data");

    // Llamar al server action para crear un nuevo deck.
    // El server action debe recibir el titulo y las imagenes del deck.
    // Las imagenes se tienen que subir al servidor (supabase) y guardar las stories y los decks en la base de datos.

    reset();

    form.reset();

    toast.toast({
      title: "Deck created",
      description: "The deck was created successfully!",
      variant: "default",
    });

    router.push("/");
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-row items-center justify-between w-2/3 "
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>

              <Input placeholder="Title" {...field} />

              <div className="min-h-10">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={!form.getValues("title") || !items.length}
        >
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default StoryDeckForm;
