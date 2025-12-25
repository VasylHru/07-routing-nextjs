"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import css from "@/components/NotePreview/NotePreview.module.css";

export default function NotePreview({ id }: { id: string }) {
  const router = useRouter();
  const queryParams = { page: 1 };

  const { data } = useQuery({
    queryKey: ["notes", queryParams],
    queryFn: () => fetchNotes(queryParams),
    refetchOnMount: false,
  });

  const note = data?.notes.find(
    note => note.id === id
  );

  if (!note) return null;

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.modalContent}>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
        <p>Tag: {note.tag}</p>
        <p>
          Created: {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
    </Modal>
  );
}
