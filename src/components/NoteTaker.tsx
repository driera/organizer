import { FunctionComponent } from "react";
import { useState } from "react";

type NoteTakerTypes = { onClick: (note: string) => void };

export const NoteTaker: FunctionComponent<NoteTakerTypes> = ({ onClick }) => {
  const [text, setText] = useState<string>("");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleClick = () => {
    if (text === "") return;

    onClick(text);
    setText("");
  };

  return (
    <>
      <h1>Do you have anything to write down?</h1>
      <input type="text" onChange={handleInput} value={text} />
      <button onClick={handleClick}>Send</button>
    </>
  );
};
