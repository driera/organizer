import { useState } from "react";
import "./App.css";
import { NoteTaker } from "./components/NoteTaker";
import { NoteList } from "./components/NoteList";

function App() {
  const [notes, setNotes] = useState<string[]>([]);

  const handleClick = (note: string) => {
    setNotes([...notes, note]);
  };

  return (
    <>
      <NoteTaker onClick={handleClick} />
      <NoteList notes={notes} />
    </>
  );
}

export default App;
