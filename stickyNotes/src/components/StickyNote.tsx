import { SetStateAction, useState } from "react";
import "./StickyNote.css";

const StickyNote = () => {
  const [text, setText] = useState("");

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setText(event.target.value);
  };
  console.log({ text });
  return (
    <div className="stickyNoteContainer">
      <div className="noteNavBar">
        <div>+</div>
        <div>x</div>
      </div>
      <textarea className="noteArea" value={text} onChange={handleChange} />
    </div>
  );
};

export default StickyNote;
