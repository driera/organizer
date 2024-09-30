import { useEffect, useState } from "react";
import { NotesRepository } from "./repository/notes-repository";
import { Note, Notes } from "./types";

export const useNotes = () => {
  const [notes, setNotes] = useState<Notes>(NotesRepository.getNotes());

  useEffect(() => {
    NotesRepository.setNotes(notes);
  }, [notes]);

  const addNote = (note: Note) => setNotes([note, ...notes]);

  const removeNote = (index: number) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };

  const updateNotes = (newNotes: Notes) => setNotes(newNotes);

  return { notes, addNote, removeNote, updateNotes };
};
