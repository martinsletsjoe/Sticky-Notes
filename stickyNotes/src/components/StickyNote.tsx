import { useEffect, useState } from "react";
import "./StickyNote.css";
import axios from "axios";
import Note from "./Note";

type Note = {
  _id: number;
  text: string;
  createdAt: string;
};

const StickyNote = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const result = await axios.get(`http://localhost:3001/notes`);
        setNotes(result.data);
      } catch (error) {
        console.error("failed to fetch notes:", error);
      }
    };
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Failed to delete note: ", error);
    }
  };

  const handleUpdate = (id: number, newText: string) => {
    const updateNotes = notes.map((note) => {
      if (note._id === id) {
        return { ...note, text: newText };
      }
      return note;
    });
    setNotes(updateNotes);
  };
  const addNote = async () => {
    const newNote = {
      text: "",
      createdAt: new Date(),
    };
    try {
      const response = await axios.post(
        `http://localhost:3001/notes/`,
        newNote
      );
      setNotes((prevNotes) => [...prevNotes, response.data]);
    } catch (error) {
      console.error("failed to add note: ", error);
    }
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {notes.map((note) => (
        <div className="stickyNoteContainer" key={note._id}>
          <div className="noteNavBar">
            <button onClick={addNote} className="noteButton">
              +
            </button>
            <button
              className="noteButton"
              type="button"
              onClick={() => handleDelete(note._id)}
            >
              x
            </button>
          </div>

          <Note note={note} onUpdate={handleUpdate} />
          <small>
            {new Date(note.createdAt).toLocaleDateString("no-NO", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </small>
        </div>
      ))}
      {notes.length === 0 ? <button onClick={addNote}>add</button> : ""}
    </div>
  );
};

export default StickyNote;
