import { useMutation, useQueryClient } from '@tanstack/react-query';
import css from "./NoteList.module.css";
import type { Note } from '../../types/note';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { deleteNote } from '@/lib/api';




interface NotesListProps {
  notes: Note[];
}
export default function NoteList({ notes }: NotesListProps) {

  const queryClient = useQueryClient();


  const { mutate } = useMutation({
    mutationFn: (id: Note['id']) => deleteNote(id),
    onError: () => toast('Sorry, something went wrong, please try again'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  // const { mutate: updateMutate } = useMutation({
  //   mutationFn: (noteUpdateData: NoteUpdateData) => updateNote(noteUpdateData),
  //   // 
  //   onSuccess(updatedNote) {
  //     queryClient.setQueryData<Note[]>(['notes'], (prevNotes) => {
  //       if (!prevNotes) return {results: []};
  //       return {results: prevNotes.results.map((note) => updatedNote.id === note.id ? updatedNote : note)};
  //     });
  //   },
  // });

  // const handleUpdate = (note: Note) => {
  //   updateMutate({
  //     id: note.id, title: note.title, content: note.content
  //   });
  // };

  return (
    <ul className={css.list}>
      {notes.map((note) => {
        return (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content} </p>

            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <Link href={`/notes/${note.id}`} className={css.link}>View details</Link>
              <button className={css.button} type="button" onClick={() => mutate(note.id)}>Delete</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
