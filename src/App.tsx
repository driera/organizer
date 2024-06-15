import { useState } from "react";
import "./App.css";
import { NoteTaker } from "./components/NoteTaker";
import { NoteList } from "./components/NoteList";

function App() {
  const [notes, setNotes] = useState<string[]>([]);

  const handleClick = (note: string) => {
    setNotes([note, ...notes]);
  };

  const handleDelete = (index: number) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };

  return (
    <>
      <NoteTaker onClick={handleClick} />
      <NoteList notes={notes} onDelete={handleDelete} />
    </>
  );
}

export default App;
