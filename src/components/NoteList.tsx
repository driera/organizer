import { FunctionComponent } from "react";
import style from "./NoteList.module.css";

type NoteListTypes = {
  notes: string[];
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
          <div id={`note${index}`} className={style.note}>
            {note}
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
