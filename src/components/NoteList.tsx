import { FunctionComponent } from "react";

type NoteListTypes = {
  notes: string[];
};

export const NoteList: FunctionComponent<NoteListTypes> = ({ notes }) => {
  if (notes.length === 0) {
    return <p>No notes yet.</p>;
  }
  return (
    <ul>
      {notes.map((note, index) => (
        <li key={index}>{note}</li>
      ))}
    </ul>
  );
};
