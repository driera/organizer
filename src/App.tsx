import { useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState<string[]>([]);

  const handleClick = (note: string) => {
    setNotes([...notes, note]);
  };

  return (
    <>
      <h1>Do you have anything to write down?</h1>
      <NoteTaker onClick={handleClick} />
      <ul>
        {notes.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </>
  );
}

const NoteTaker = ({ onClick }: { onClick: (note: string) => void }) => {
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
      <input type="text" onChange={handleInput} value={text} />
      <button onClick={handleClick}>Send</button>
    </>
  );
};

export default App;
