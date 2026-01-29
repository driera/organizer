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
          onDueDateChange={jest.fn()}
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
        <NoteList
          notes={notes}
          onDelete={onDelete}
          onDueDateChange={jest.fn()}
        />
      </Provider>
    );

    const button = screen.getByRole("button", { name: "Delete note #0" });
    await user.click(button);

    expect(onDelete).toHaveBeenCalledWith(0);
  });

  describe("due date", () => {
    it("each note has a select dropdown for due date", () => {
      render(
        <Provider>
          <NoteList
            notes={[{ message: "Hello, World!", dueDate: "today" }]}
            onDelete={jest.fn()}
            onDueDateChange={jest.fn()}
          />
        </Provider>
      );

      const selectTrigger = screen.getByRole("combobox", {
        name: /due date/i
      });
      expect(selectTrigger).toBeInTheDocument();
    });

    it("displays current due date as selected value", () => {
      render(
        <Provider>
          <NoteList
            notes={[
              { message: "Note 1", dueDate: "today" },
              { message: "Note 2", dueDate: "some day" }
            ]}
            onDelete={jest.fn()}
            onDueDateChange={jest.fn()}
          />
        </Provider>
      );

      const comboboxes = screen.getAllByRole("combobox", { name: /due date/i });
      expect(comboboxes).toHaveLength(2);
    });

    it("shows both 'today' and 'some day' options when opened", async () => {
      const user = userEvent.setup({ delay: 0 });
      render(
        <Provider>
          <NoteList
            notes={[{ message: "Hello, World!", dueDate: "today" }]}
            onDelete={jest.fn()}
            onDueDateChange={jest.fn()}
          />
        </Provider>
      );

      const selectTrigger = screen.getByRole("combobox", {
        name: /due date/i
      });
      await user.click(selectTrigger);

      expect(
        screen.getByRole("option", { name: /^today$/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: /^some day$/i })
      ).toBeInTheDocument();
    });

    it("calls onDueDateChange callback when user selects new date", async () => {
      const user = userEvent.setup({ delay: 0 });
      const onDueDateChange = jest.fn();
      render(
        <Provider>
          <NoteList
            notes={[{ message: "Hello, World!", dueDate: "today" }]}
            onDelete={jest.fn()}
            onDueDateChange={onDueDateChange}
          />
        </Provider>
      );

      const selectTrigger = screen.getByRole("combobox", {
        name: /due date/i
      });
      await user.click(selectTrigger);

      const someDayOption = screen.getByRole("option", { name: /^some day$/i });
      await user.click(someDayOption);

      expect(onDueDateChange).toHaveBeenCalledWith(0, "some day");
    });

    it("multiple notes have independent select controls", async () => {
      const user = userEvent.setup({ delay: 0 });
      const onDueDateChange = jest.fn();
      render(
        <Provider>
          <NoteList
            notes={[
              { message: "Note 1", dueDate: "today" },
              { message: "Note 2", dueDate: "some day" }
            ]}
            onDelete={jest.fn()}
            onDueDateChange={onDueDateChange}
          />
        </Provider>
      );

      const selectTriggers = screen.getAllByRole("combobox", {
        name: /due date/i
      });
      expect(selectTriggers).toHaveLength(2);

      await user.click(selectTriggers[1]);
      const todayOption = screen.getByRole("option", { name: /^today$/i });
      await user.click(todayOption);

      expect(onDueDateChange).toHaveBeenCalledWith(1, "today");
    });
  });
});
