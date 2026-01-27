import { render, screen } from "@testing-library/react";
import { NoteList } from "./NoteList";
import userEvent from "@testing-library/user-event";
import { Provider } from "./ui/provider";

describe("NoteList", () => {
  it("renders a list of notes", () => {
    render(
      <Provider>
        <NoteList
          notes={[{ message: "Hello, World!", dueDate: "today" }]}
          onDelete={jest.fn()}
        />
      </Provider>
    );

    expect(screen.getByLabelText("Hello, World!")).toBeInTheDocument();
  });

  it("runs callback when note delete button is triggered", async () => {
    const user = userEvent.setup({ delay: 0 });
    const notes: Notes = [
      { message: "Hello, World!", dueDate: dueDates.TODAY }
    ];
    const onDelete = jest.fn();
    render(
      <Provider>
        <NoteList notes={notes} onDelete={onDelete} />
      </Provider>
    );

    const button = screen.getByRole("button", { name: "Delete note #0" });
    await user.click(button);

    expect(onDelete).toHaveBeenCalledWith(0);
  });

  describe("due date", () => {
    it("each notes has a select with its due day", () => {
      render(
        <Provider>
          <NoteList
            notes={[{ message: "Hello, World!", dueDate: "today" }]}
            onDelete={jest.fn()}
          />
        </Provider>
      );

      await user.selectOptions(
        screen.getByRole("combobox", { name: "Due date" }),
        "some day"
      );

      expect(onUpdate).toHaveBeenCalledWith([{ dueDate: "some day", message }]);
    });
  });
});
