import { FunctionComponent } from "react";
import { useState } from "react";
import { Note } from "../types";

type NoteTakerTypes = { onClick: (note: Note) => void };

export const NoteTaker: FunctionComponent<NoteTakerTypes> = ({ onClick }) => {
  const emptyNote: Note = { message: "" };
  const [note, setNote] = useState<Note>(emptyNote);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote({ message: event.target.value });
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
