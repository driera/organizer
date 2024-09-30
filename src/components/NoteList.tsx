import { FunctionComponent } from "react";
import style from "./NoteList.module.css";
import { Notes } from "../types";

type NoteListTypes = {
  notes: Notes;
  onDelete: (index: number) => void;
};

export const NoteList: FunctionComponent<NoteListTypes> = ({
  notes,
  onDelete
}) => {
  if (notes.length === 0) {
    return <p>No notes yet.</p>;
  }

  return (
    <ul className={style.list}>
      {notes.map((note, index) => (
        <li
          key={index}
          className={style.listItem}
          aria-labelledby={`note${index}`}
        >
          <div className={style.note}>
            <span id={`note${index}`} className={style.noteContent}>
              {note.message}
            </span>
            <select aria-label="Due date" className={style.dueDate}>
              <option value={note.dueDate}>{note.dueDate}</option>
            </select>
          </div>
          <button
            aria-label={`Delete note #${index}`}
            onClick={() => onDelete(index)}
          >
            X
          </button>
        </li>
      ))}
    </ul>
  );
};
