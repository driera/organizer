import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { NotesRepository } from "./repository/notes-repository";

describe("App", () => {
  beforeEach(() => {
    NotesRepository.resetNotes();
  });

  it("renders the title", () => {
    render(<App />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Do you have anything to write down?"
    );
  });

  it("allows to write a note", async () => {
    const user = userEvent.setup({ delay: 0 });
    render(<App />);

    const input = screen.getByRole("textbox");
    await user.type(input, "Hello, World!");
    const button = screen.getByRole("button", { name: "Send" });
    await user.click(button);

    await screen.findByRole("listitem");
  });

  it("shows placeholders when there are no notes", () => {
    render(<App />);

    expect(screen.getByText("No notes yet.")).toBeInTheDocument();
  });

  it("writes and removes a note", async () => {
    const user = userEvent.setup({ delay: 0 });
    render(<App />);

    const input = screen.getByRole("textbox");
    await user.type(input, "Hello, World!");
    const button = screen.getByRole("button", { name: "Send" });
    await user.click(button);

    await screen.findByRole("listitem", { name: "Hello, World!" });

    const deleteButton = screen.getByRole("button", { name: "Delete note #0" });
    await user.click(deleteButton);

    expect(screen.getByText("No notes yet.")).toBeInTheDocument();
  });

  it("Most recent note appears first", async () => {
    const user = userEvent.setup({ delay: 0 });
    render(<App />);

    const input = screen.getByRole("textbox");
    await user.type(input, "Hello, World!");
    const button = screen.getByRole("button", { name: "Send" });
    await user.click(button);

    await user.type(input, "Good bye!");
    await user.click(button);

    const notes = screen.getAllByRole("listitem");

    expect(notes[0]).toHaveAccessibleName("Good bye!");
    expect(notes[1]).toHaveAccessibleName("Hello, World!");
  });
});
