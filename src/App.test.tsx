import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
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
});
