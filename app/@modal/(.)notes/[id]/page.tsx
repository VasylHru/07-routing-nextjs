import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { notFound } from "next/navigation";
import NotePreview from "./NotePreview.client";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ModalNote({ params }: Props) {
  const queryClient = new QueryClient();
  const { id } = await params;

  const queryParams = { page: 1 };

  const data = await queryClient.fetchQuery({
    queryKey: ["notes", queryParams],
    queryFn: () => fetchNotes(queryParams),
  });

  if (!data.notes.some(note => note.id === Number(id))) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview id={id} />
    </HydrationBoundary>
  );
}
