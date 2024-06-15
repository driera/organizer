import { render, screen } from "@testing-library/react";
import { NoteList } from "./NoteList";
import userEvent from "@testing-library/user-event";

describe("NoteList", () => {
  it("renders a list of notes", () => {
    render(<NoteList notes={["Hello, World!"]} onDelete={jest.fn()} />);

    expect(
      screen.getByRole("listitem", { name: "Hello, World!" })
    ).toBeInTheDocument();
  });

  it("runs callback when note delete button is triggered", async () => {
    const user = userEvent.setup({ delay: 0 });
    const notes = ["Hello, World!"];
    const onDelete = jest.fn();
    render(<NoteList notes={["Hello, World!"]} onDelete={onDelete} />);

    const button = screen.getByRole("button", { name: "Delete note #0" });
    await user.click(button);

    expect(onDelete).toHaveBeenCalledWith(notes.indexOf("Hello, World!"));
  });
});
