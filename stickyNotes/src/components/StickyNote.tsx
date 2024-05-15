import { useEffect, useState } from "react";
import "./StickyNote.css";

type Note = {
  id: number;
  text: string;
};

const StickyNote = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("/api/notes");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error("failed to fetch notes:", error);
      }
    };
    fetchNotes();
  }, []);

  const handleChange = (id: number, newText: string) => {
    // Update the text of the specific note
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, text: newText } : note
    );
    setNotes(updatedNotes);
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const addNote = (event) => {
    event.preventDefault();
    const newNote: Note = {
      id: Date.now(),
      text: "",
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  return (
    <div>
      {notes.map((note) => (
        <form key={note.id}>
          <div className="stickyNoteContainer">
            <div className="noteNavBar">
              <button
                onClick={addNote}
                style={{ background: "none", border: "none", color: "black" }}
              >
                +
              </button>
              <button onClick={() => deleteNote(note.id)}>x</button>
            </div>
            <textarea
              className="noteArea"
              value={note.text}
              onChange={(event) => handleChange(note.id, event.target.value)}
            />
          </div>
        </form>
      ))}
      {notes.length === 0 ? <button onClick={addNote}>Add note</button> : ""}
    </div>
  );
};

export default StickyNote;
