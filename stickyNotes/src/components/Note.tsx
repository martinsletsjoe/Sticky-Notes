import axios from "axios";
import { useState } from "react";

const Note = ({ note, onUpdate }) => {
  const [text, setText] = useState(note.text);

  const handleSubmit = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3001/notes/${note._id}`,
        {
          text: text,
        }
      );

      onUpdate(note._id, text);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to update note: ", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div style={{ display: "flex", flex: 1 }}>
      <form
        onSubmit={handleSubmit}
        style={{
          flex: 1,
          padding: "8px",
        }}
      >
        <textarea
          onKeyDown={handleKeyDown}
          className="noteArea"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </form>
    </div>
  );
};

export default Note;
