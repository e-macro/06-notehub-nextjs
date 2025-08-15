import css from "./NotesPage.module.css";
import NoteListClient from "./Notes.client";
import { QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";

type Props ={
  params: Promise<{ page: number, query: string }>;
}

export default async function App({ params }: Props) {
  const queryClient = new QueryClient();

  const { page, query } = await params;

  queryClient.prefetchQuery({
    queryKey: ['notes', query, page],
    queryFn: () => fetchNotes(page, query),
  });
  return (
  <div className={css.app}>
    <NoteListClient/>
  </div>

  );
}