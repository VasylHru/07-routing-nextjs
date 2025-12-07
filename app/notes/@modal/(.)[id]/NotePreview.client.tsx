"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useRouter } from "next/navigation";
import css from "./NotePreview.module.css";

export default function NotePreviewClient({ id }: { id: string }) {
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.modalContent}>
      <button className={css.closeButton} onClick={() => router.back()}>
        ✕
      </button>

      <h2 className={css.title}>{note.title}</h2>
      <p className={css.text}>{note.content}</p>
      <p className={css.tag}>{note.tag}</p>
      <p className={css.date}>{note.createdAt}</p>
    </div>
  );
}
