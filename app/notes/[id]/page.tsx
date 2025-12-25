import { fetchNotes } from "@/lib/api";
import { notFound } from "next/navigation";

type PageProps = {
  params: { id: string };
};

export default async function NotePage({ params }: PageProps) {
  const { id } = params;

  const data = await fetchNotes({ page: 1 });

  const note = data.notes.find(
    (note) => note.id === id
  );

  if (!note) notFound();

  return (
    <main style={{ padding: 24 }}>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <p><strong>Tag:</strong> {note.tag}</p>
      <p>
        Created: {new Date(note.createdAt).toLocaleDateString()}
      </p>
    </main>
  );
}
