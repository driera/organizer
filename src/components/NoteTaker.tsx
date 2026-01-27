import { FunctionComponent, useState } from "react";
import { Note } from "../types";
import { Input, Button, Flex, Heading } from "@chakra-ui/react";

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
      <Heading size="xl" mb={4}>
        Do you have anything to write down?
      </Heading>
      <Flex gap={4} mb={8}>
        <Input onChange={handleInput} value={note.message} />
        <Button onClick={handleClick}>Send</Button>
      </Flex>
    </>
  );
};
