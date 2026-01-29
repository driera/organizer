import { NoteTaker } from "./components/NoteTaker";
import { NoteList } from "./components/NoteList";
import { useNotes } from "./useNotes";
import { Container } from "@chakra-ui/react";

function App() {
  const { notes, addNote, removeNote, updateNoteDueDate } = useNotes();

  return (
    <Container py={8} textAlign="center">
      <NoteTaker onClick={addNote} />
      <NoteList
        notes={notes}
        onDelete={removeNote}
        onDueDateChange={updateNoteDueDate}
      />
    </Container>
  );
}

export default App;
