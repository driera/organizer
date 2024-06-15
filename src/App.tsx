import { useState } from "react";
import "./App.css";
import { NoteTaker } from "./components/NoteTaker";
import { NoteList } from "./components/NoteList";
import { NotesRepository } from "./repository/notes-repository";

function App() {
  const [notes, setNotes] = useState<string[]>(NotesRepository.getNotes());

  const handleClick = (note: string) => {
    const newNotes = [note, ...notes];
    setNotes(newNotes);
    NotesRepository.setNotes(newNotes);
  };

  const handleDelete = (index: number) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
    NotesRepository.setNotes(newNotes);
  };

  return (
    <>
      <NoteTaker onClick={handleClick} />
      <NoteList notes={notes} onDelete={handleDelete} />
    </>
  );
}

export default App;
