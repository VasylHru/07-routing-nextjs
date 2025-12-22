import axios from "axios";
import type { Note, NoteTag } from "@/types/note";

const BASE_URL = "https://notehub-public.goit.study/api";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const noteApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
export interface DeleteNoteResponse {
  message: string;
  note: Note;
}

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const {
    page = 1,
    perPage = 12,
    search,
    tag,
  } = params;

  const response = await noteApi.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      ...(search && { search }),
      ...(tag && tag !== "all" && { tag }),
    },
  });

  return response.data;
};

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await noteApi.get<Note>(`/notes/${id}`);
  return response.data;
}

export async function createNote(data: CreateNoteParams): Promise<Note> {
  const response = await noteApi.post<Note>("/notes", data);
  return response.data;
}

export async function deleteNote(id: string): Promise<DeleteNoteResponse> {
  const response = await noteApi.delete<DeleteNoteResponse>(`/notes/${id}`);
  return response.data;
}
