import { FunctionComponent } from "react";
import { Notes } from "../types";
import {
  Flex,
  Card,
  Button,
  Portal,
  Select,
  createListCollection
} from "@chakra-ui/react";

type NoteListTypes = {
  notes: Notes;
  onDelete: (index: number) => void;
  onDueDateChange: (index: number, newDueDate: string) => void;
};

const dueDateOptions = createListCollection({
  items: [
    { label: "today", value: "today" },
    { label: "some day", value: "some day" }
  ]
});

export const NoteList: FunctionComponent<NoteListTypes> = ({
  notes,
  onDelete,
  onDueDateChange
}) => {
  if (notes.length === 0) {
    return <p>No notes yet.</p>;
  }

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
                <Select.Root
                  collection={dueDateOptions}
                  size="sm"
                  width="120px"
                  value={[note.dueDate]}
                  onValueChange={(e) => onDueDateChange(index, e.value[0])}
                  positioning={{ sameWidth: false }}
                >
                  <Select.HiddenSelect />
                  <Select.Label srOnly>Due date</Select.Label>
                  <Select.Control>
                    <Select.Trigger
                      cursor="pointer"
                      _hover={{
                        borderColor: "blue.500",
                        boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)"
                      }}
                      _focusVisible={{
                        borderColor: "blue.500",
                        boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)"
                      }}
                    >
                      <Select.ValueText />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {dueDateOptions.items.map((item) => (
                          <Select.Item item={item} key={item.value}>
                            {item.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
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
