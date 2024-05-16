import axios from "axios";
import { useState } from "react";

const Note = ({ note, onDelete, onUpdate }) => {
  const [text, setText] = useState(note.text);

  const handleSubmit = async (event) => {
    event.preventDefault();
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

  const handleDeleteClick = (event) => {
    event.stopPropagation(); // Stop the event from propagating to other handlers
    event.preventDefault();
    onDelete(note._id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="stickyNoteContainer">
        <div className="noteNavBar">
          <button
            style={{ background: "none", border: "none", color: "black" }}
          >
            +
          </button>
          <button type="button" onClick={handleDeleteClick}>
            x
          </button>
        </div>
        <textarea
          className="noteArea"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <small>{new Date(note.createdAt).toUTCString()}</small>
      </div>
    </form>
  );
};

export default Note;
