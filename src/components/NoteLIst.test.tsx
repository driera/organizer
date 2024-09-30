import { render, screen } from "@testing-library/react";
import { NoteList } from "./NoteList";
import userEvent from "@testing-library/user-event";
import { Notes } from "../types";

describe("NoteList", () => {
  it("renders a list of notes", () => {
    render(
      <NoteList
        notes={[{ message: "Hello, World!", dueDate: "today" }]}
        onDelete={jest.fn()}
        onUpdate={jest.fn()}
      />
    );

    expect(
      screen.getByRole("listitem", { name: "Hello, World!" })
    ).toBeInTheDocument();
  });

  it("runs callback when note delete button is triggered", async () => {
    const user = userEvent.setup({ delay: 0 });
    const notes: Notes = [{ message: "Hello, World!", dueDate: "today" }];
    const onDelete = jest.fn();
    render(<NoteList notes={notes} onDelete={onDelete} onUpdate={jest.fn()} />);

    const button = screen.getByRole("button", { name: "Delete note #0" });
    await user.click(button);

    expect(onDelete).toHaveBeenCalledWith(0);
  });

  describe("due date", () => {
    it("each notes has a select with its due day", () => {
      render(
        <NoteList
          notes={[{ message: "Hello, World!", dueDate: "today" }]}
          onDelete={jest.fn()}
          onUpdate={jest.fn()}
        />
      );

      expect(
        screen.getByRole("combobox", { name: "Due date" })
      ).toBeInTheDocument();
      expect(
        (screen.getByRole("option", { name: "Today" }) as HTMLOptionElement)
          .selected
      ).toBe(true);
    });

    it("allows to update its value", async () => {
      const user = userEvent.setup({ delay: 0 });
      const onUpdate = jest.fn();
      const message = "Hello, World!";
      render(
        <NoteList
          notes={[{ message, dueDate: "today" }]}
          onDelete={jest.fn()}
          onUpdate={onUpdate}
        />
      );

      await user.selectOptions(
        screen.getByRole("combobox", { name: "Due date" }),
        "some day"
      );

      expect(onUpdate).toHaveBeenCalledWith([{ dueDate: "some day", message }]);
    });
  });
});
