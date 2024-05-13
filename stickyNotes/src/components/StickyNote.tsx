import { SetStateAction, useState } from "react";
import "./StickyNote.css";

type Note = {
  id: number;
  text: string;
};

const empty = {
  id: Date.now(),
  text: "str",
};

const StickyNote = () => {
  // const [text, setText] = useState("");

  const [notes, setNotes] = useState<Note[]>([empty]);

  const handleChange = (id: number, newText: string) => {
    // Update the text of the specific note
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, text: newText } : note
    );
    setNotes(updatedNotes);
    console.log(notes[0].text);
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
    setNotes([...notes, newNote]);
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
    </div>
  );
};

export default StickyNote;
