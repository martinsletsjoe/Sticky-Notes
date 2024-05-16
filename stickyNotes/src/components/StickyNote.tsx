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
  return (
    <div>
      {notes.map((note) => (
        <Note
          key={note._id}
          note={note}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

export default StickyNote;
