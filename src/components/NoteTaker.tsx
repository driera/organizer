import { FunctionComponent } from "react";
import { useState } from "react";
import { dueDates, Note } from "../types";

type NoteTakerTypes = { onClick: (note: Note) => void };

export const NoteTaker: FunctionComponent<NoteTakerTypes> = ({ onClick }) => {
  const emptyNote: Note = { message: "", dueDate: dueDates.TODAY };
  const [note, setNote] = useState<Note>(emptyNote);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote({ message: event.target.value, dueDate: dueDates.TODAY });
  };

  const handleClick = () => {
    if (note.message === "") return;

    onClick(note);
    setNote(emptyNote);
  };

  return (
    <>
      <h1>Do you have anything to write down?</h1>
      <input type="text" onChange={handleInput} value={note.message} />
      <button onClick={handleClick}>Send</button>
    </>
  );
};
