import { FunctionComponent } from "react";
import { Notes } from "../types";
import { Flex, Card, Button } from "@chakra-ui/react";

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
    <Flex direction="column" gap={4}>
      {notes.map((note, index) => (
        <Card.Root
          size="sm"
          key={index}
          aria-labelledby={`note${index}`}
          boxShadow="lg"
          bg="#eee"
        >
          <Flex direction="row" alignItems="center" width="full">
            <Card.Body flex="1" color="black">
              <Flex
                direction="row"
                gap={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <span id={`note${index}`}>{note.message}</span>
                <span>{note.dueDate}</span>
              </Flex>
            </Card.Body>
            <Card.Footer padding={2}>
              <Button
                colorPalette="blue"
                aria-label={`Delete note #${index}`}
                onClick={() => onDelete(index)}
              >
                X
              </Button>
            </Card.Footer>
          </Flex>
        </Card.Root>
      ))}
    </Flex>
  );
};
