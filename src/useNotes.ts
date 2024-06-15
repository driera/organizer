import { useEffect, useState } from "react";
import { NotesRepository } from "./repository/notes-repository";

export const useNotes = () => {
  const [notes, setNotes] = useState<string[]>(NotesRepository.getNotes());

  useEffect(() => {
    NotesRepository.setNotes(notes);
  }, [notes]);

  const addNote = (note: string) => setNotes([note, ...notes]);

  const removeNote = (index: number) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };

  return { notes, addNote, removeNote };
};
