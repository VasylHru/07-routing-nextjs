import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "@/app/notes/Notes.client";

export default async function NotesFilterPage({
  params,
}: {
  params: Promise<{ tag: string[] }>;
}) {
  const queryClient = new QueryClient();

  const { tag } = await params;

  const tagParam = tag?.[0];
  const normalizedTag = tagParam === "all" ? undefined : tagParam;

  await queryClient.prefetchQuery({
   queryKey: ["notes", "filter", tag ?? "all"],
    queryFn: () => fetchNotes(1, undefined, normalizedTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
