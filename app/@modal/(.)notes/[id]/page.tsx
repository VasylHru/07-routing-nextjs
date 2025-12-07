import Modal from "@/components/Modal/Modal";
import NotePreviewClient from "./NotePreview.client";

export default function ModalNote({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Modal>
      <NotePreviewClient id={params.id} />
    </Modal>
  );
}
