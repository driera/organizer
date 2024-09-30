import { FunctionComponent } from "react";
import style from "./NoteList.module.css";
import { dueDates, Note, Notes } from "../types";

type NoteListTypes = {
  notes: Notes;
  onDelete: (index: number) => void;
  onUpdate: (notes: Notes) => void;
};

export const NoteList: FunctionComponent<NoteListTypes> = ({
  notes,
  onDelete,
  onUpdate
}) => {
  if (notes.length === 0) {
    return <p>No notes yet.</p>;
  }

  const handleChange = (value: dueDates, note: Note, index: number) => {
    const newNotes = [...notes];
    newNotes[index] = { ...note, dueDate: value };
    onUpdate(newNotes);
  };

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
            <select
              aria-label="Due date"
              className={style.dueDate}
              defaultValue={note.dueDate}
              onChange={(event) =>
                handleChange(event.target.value as dueDates, note, index)
              }
            >
              <option value={dueDates.TODAY}>Today</option>
              <option value={dueDates.SOME_DAY}>Some day</option>
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
