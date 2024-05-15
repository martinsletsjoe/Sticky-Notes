import { useEffect, useState } from "react";
import "./StickyNote.css";
import axios from "axios";

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
        const response = await axios.get("http://localhost:3001/notes");
        setNotes(response.data);
        // const response = await fetch("/notes");
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }
        // const data = await response.json();
        // setNotes(data);
      } catch (error) {
        console.error("failed to fetch notes:", error);
      }
    };
    fetchNotes();
  }, []);

  // const handleChange = (id: number, newText: string) => {
  //   // Update the text of the specific note
  //   const updatedNotes = notes.map((note) =>
  //     note.id === id ? { ...note, text: newText } : note
  //   );
  //   setNotes(updatedNotes);
  // };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note._id !== id));
  };

  // const addNote = (event) => {
  //   event.preventDefault();
  //   const newNote: Note = {
  //     id: Date.now(),
  //     text: "",
  //   };
  //   setNotes((prevNotes) => [...prevNotes, newNote]);
  // };

  //   return (
  //     <div>
  //       <h1>Sticky Notes</h1>
  //       <ul>
  //         {notes.map((note) => (
  //           <li key={note._id}>
  //             <p>{note.text}</p>
  //             <small>{new Date(note.createdAt).toISOString()}</small>
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   );
  // };

  return (
    <div>
      {notes.map((note) => (
        <form key={note._id}>
          <div className="stickyNoteContainer">
            <div className="noteNavBar">
              <button
                // onClick={addNote}
                style={{ background: "none", border: "none", color: "black" }}
              >
                +
              </button>
              <button onClick={() => deleteNote(note._id)}>x</button>
            </div>
            <textarea
              className="noteArea"
              value={note.text}
              // onChange={(event) => handleChange(note.id, event.target.value)}
            />
            <small>{new Date(note.createdAt).toLocaleTimeString()}</small>
          </div>
        </form>
      ))}
      {/* {notes.length === 0 ? <button onClick={addNote}>Add note</button> : ""} */}
    </div>
  );
};

export default StickyNote;
