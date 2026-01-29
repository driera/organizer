import { FunctionComponent, useState } from "react";
import { Note, dueDates } from "../types";
import { Input, Button, Flex, Heading } from "@chakra-ui/react";

type NoteTakerTypes = { onClick: (note: Note) => void };

export const NoteTaker: FunctionComponent<NoteTakerTypes> = ({ onClick }) => {
  const emptyNote: Note = { message: "", dueDate: dueDates.TODAY };
  const [note, setNote] = useState<Note>(emptyNote);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote({ message: event.target.value, dueDate: dueDates.TODAY });
  };

  const sendNote = () => {
    if (note.message === "") return;

    onClick(note);
    setNote(emptyNote);
  };

  const handleClick = () => {
    sendNote();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendNote();
    }
  };

  return (
    <>
      <Heading size="xl" mb={4}>
        Do you have anything to write down?
      </Heading>
      <Flex gap={4} mb={8}>
        <Input
          onChange={handleInput}
          value={note.message}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={handleClick}>Send</Button>
      </Flex>
    </>
  );
};
