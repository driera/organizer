import { FunctionComponent } from "react";
import style from "./NoteList.module.css";

type NoteListTypes = {
  notes: string[];
};

export const NoteList: FunctionComponent<NoteListTypes> = ({ notes }) => {
  if (notes.length === 0) {
    return <p>No notes yet.</p>;
  }
  const reversedNotes = [...notes].reverse();

  return (
    <ul className={style.list}>
      {reversedNotes.map((note, index) => (
        <li key={index} className={style.note}>
          {note}
        </li>
      ))}
    </ul>
  );
};
