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
});
