import axios from "axios";
import type { Note } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface NewNote {
  title: string;
  content: string;
  tag: string;
}

export async function fetchNotes(
  searchValue: string,
  page: number
): Promise<FetchNotesResponse> {
  const { data } = await axios.get<FetchNotesResponse>("/notes", {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    params: {
      ...(searchValue !== "" && { search: searchValue }),
      page,
      perPage: 12,
    },
  });
  return data;
}

export async function createNote(newNote: NewNote): Promise<Note> {
  const { data } = await axios.post<Note>("/notes", newNote, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await axios.delete(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await axios.get(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return data;
}
