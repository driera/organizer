import { render, screen } from "@testing-library/react";
import { NoteList } from "./NoteList";
import userEvent from "@testing-library/user-event";

describe("NoteList", () => {
  it("renders a list of notes", () => {
    render(
      <NoteList
        notes={[{ message: "Hello, World!", dueDate: "today" }]}
        onDelete={jest.fn()}
      />
    );

    expect(
      screen.getByRole("listitem", { name: "Hello, World!" })
    ).toBeInTheDocument();
  });

  it("runs callback when note delete button is triggered", async () => {
    const user = userEvent.setup({ delay: 0 });
    const notes = [{ message: "Hello, World!", dueDate: "today" }];
    const onDelete = jest.fn();
    render(<NoteList notes={notes} onDelete={onDelete} />);

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
        />
      );

      expect(screen.getByText("today")).toBeInTheDocument();
    });
  });
});
