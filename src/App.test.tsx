import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { NotesRepository } from "./repository/notes-repository";
import { Provider } from "./components/ui/provider";

describe("App", () => {
  beforeEach(() => {
    NotesRepository.resetNotes();
  });

  it("renders the title", () => {
    render(
      <Provider>
        <App />
      </Provider>
    );

    expect(screen.getByRole("heading")).toHaveTextContent(
      "Do you have anything to write down?"
    );
  });

  it("allows to write a note", async () => {
    const user = userEvent.setup({ delay: 0 });
    render(
      <Provider>
        <App />
      </Provider>
    );

    const input = screen.getByRole("textbox");
    await user.type(input, "Hello, World!");
    const button = screen.getByRole("button", { name: "Send" });
    await user.click(button);

    await screen.findByText("Hello, World!");
  });

  it("allows to write a note with Enter key", async () => {
    const user = userEvent.setup({ delay: 0 });
    render(
      <Provider>
        <App />
      </Provider>
    );

    const input = screen.getByRole("textbox");
    await user.type(input, "Hello, World!{Enter}");

    await screen.findByText("Hello, World!");
  });

  it("shows placeholders when there are no notes", () => {
    render(
      <Provider>
        <App />
      </Provider>
    );

    expect(screen.getByText("No notes yet.")).toBeInTheDocument();
  });

  it("writes and removes a note", async () => {
    const user = userEvent.setup({ delay: 0 });
    render(
      <Provider>
        <App />
      </Provider>
    );

    const input = screen.getByRole("textbox");
    await user.type(input, "Hello, World!");
    const button = screen.getByRole("button", { name: "Send" });
    await user.click(button);

    await screen.findByText("Hello, World!");

    const deleteButton = screen.getByRole("button", { name: "Delete note #0" });
    await user.click(deleteButton);

    expect(screen.getByText("No notes yet.")).toBeInTheDocument();
  });

  it("Most recent note appears first", async () => {
    const user = userEvent.setup({ delay: 0 });
    render(
      <Provider>
        <App />
      </Provider>
    );

    const input = screen.getByRole("textbox");
    await user.type(input, "Hello, World!");
    const button = screen.getByRole("button", { name: "Send" });
    await user.click(button);

    await user.type(input, "Good bye!");
    await user.click(button);

    const notes = screen.getAllByLabelText(/Good bye!|Hello, World!/);

    expect(notes[0]).toHaveAccessibleName("Good bye!");
    expect(notes[1]).toHaveAccessibleName("Hello, World!");
  });

  describe("Due date changes", () => {
    it("allows changing note due date from today to some day", async () => {
      const user = userEvent.setup({ delay: 0 });
      render(
        <Provider>
          <App />
        </Provider>
      );

      const input = screen.getByRole("textbox");
      await user.type(input, "Test note");
      const button = screen.getByRole("button", { name: "Send" });
      await user.click(button);

      await screen.findByText("Test note");

      const selectTrigger = screen.getByRole("combobox", { name: /due date/i });
      await user.click(selectTrigger);

      const someDayOption = screen.getByRole("option", { name: /^some day$/i });
      await user.click(someDayOption);

      const someDayElements = screen.getAllByText("some day");
      expect(someDayElements.length).toBeGreaterThan(0);
    });

    it("multiple notes maintain independent due dates", async () => {
      const user = userEvent.setup({ delay: 0 });
      render(
        <Provider>
          <App />
        </Provider>
      );

      const input = screen.getByRole("textbox");
      const sendButton = screen.getByRole("button", { name: "Send" });

      await user.type(input, "Note 1");
      await user.click(sendButton);
      await user.type(input, "Note 2");
      await user.click(sendButton);

      await screen.findByText("Note 1");
      await screen.findByText("Note 2");

      const selectTriggers = screen.getAllByRole("combobox", {
        name: /due date/i
      });

      await user.click(selectTriggers[0]);
      const someDayOption = screen.getAllByRole("option", {
        name: /^some day$/i
      })[0];
      await user.click(someDayOption);

      const someDayElements = screen.getAllByText("some day");
      expect(someDayElements.length).toBeGreaterThan(0);

      const todayElements = screen.getAllByText("today");
      expect(todayElements.length).toBeGreaterThan(0);
    });
  });
});
