import { useEffect, useState } from "react";
import { NotesRepository } from "./repository/notes-repository";
import { Note, Notes, dueDates } from "./types";

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

  const updateNoteDueDate = (index: number, newDueDate: string) => {
    if (index < 0 || index >= notes.length) {
      return;
    }
    const dueDateValue =
      newDueDate === "some day" ? dueDates.SOME_DAY : dueDates.TODAY;
    const newNotes = [...notes];
    newNotes[index] = { ...newNotes[index], dueDate: dueDateValue };
    setNotes(newNotes);
  };

  return { notes, addNote, removeNote, updateNoteDueDate };
};
