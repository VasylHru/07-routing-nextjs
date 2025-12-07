import Modal from "@/components/Modal/Modal";
import NotePreviewClient from "./NotePreview.client";
import { redirect } from "next/navigation";


export default function InterceptedNoteModal({ params }: { params: { id: string } }) {
  return (
    <Modal onClose={() => redirect("/notes")}>
      <NotePreviewClient id={params.id} />
    </Modal>
  );
}