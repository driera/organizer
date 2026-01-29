import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NoteTaker } from "./NoteTaker";
import { Provider } from "./ui/provider";

describe("NoteTaker", () => {
  it("submits note when Enter key is pressed", async () => {
    const user = userEvent.setup({ delay: 0 });
    const mockOnClick = jest.fn();

    render(
      <Provider>
        <NoteTaker onClick={mockOnClick} />
      </Provider>
    );

    const input = screen.getByRole("textbox");
    await user.type(input, "Test note{Enter}");

    expect(mockOnClick).toHaveBeenCalledWith({
      message: "Test note",
      dueDate: "today"
    });
  });

  it("does not submit when Enter is pressed with empty input", async () => {
    const user = userEvent.setup({ delay: 0 });
    const mockOnClick = jest.fn();

    render(
      <Provider>
        <NoteTaker onClick={mockOnClick} />
      </Provider>
    );

    const input = screen.getByRole("textbox");
    await user.type(input, "{Enter}");

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it("clears input after Enter key submission", async () => {
    const user = userEvent.setup({ delay: 0 });
    const mockOnClick = jest.fn();

    render(
      <Provider>
        <NoteTaker onClick={mockOnClick} />
      </Provider>
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    await user.type(input, "Test note{Enter}");

    expect(input.value).toBe("");
  });

  it("submits note when button is clicked (existing behavior)", async () => {
    const user = userEvent.setup({ delay: 0 });
    const mockOnClick = jest.fn();

    render(
      <Provider>
        <NoteTaker onClick={mockOnClick} />
      </Provider>
    );

    const input = screen.getByRole("textbox");
    await user.type(input, "Test note");
    const button = screen.getByRole("button", { name: "Send" });
    await user.click(button);

    expect(mockOnClick).toHaveBeenCalledWith({
      message: "Test note",
      dueDate: "today"
    });
  });
});
