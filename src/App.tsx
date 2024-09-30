import "./App.css";
import { NoteTaker } from "./components/NoteTaker";
import { NoteList } from "./components/NoteList";
import { useNotes } from "./useNotes";

function App() {
  const { notes, addNote, removeNote, updateNotes } = useNotes();

  return (
    <>
      <NoteTaker onClick={addNote} />
      <NoteList notes={notes} onDelete={removeNote} onUpdate={updateNotes} />
    </>
  );
}

export default App;
