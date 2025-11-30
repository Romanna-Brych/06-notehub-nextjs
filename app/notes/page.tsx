import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

interface Props {
  searchParams?: { search?: string; page?: string };
}

async function Notes({ searchParams }: Props) {
  const page = Number(searchParams?.page || 1);
  const search = searchParams?.search || "";

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", search, page],
    queryFn: () => fetchNotes(search, page),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialPage={page} initialSearch={search} />
    </HydrationBoundary>
  );
}

export default Notes;
