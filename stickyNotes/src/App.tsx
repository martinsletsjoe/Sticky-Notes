import { useState } from "react";
import "./App.css";
import StickyNote from "./components/StickyNote";

function App() {
  // Initialize with an array of unique note indices to render multiple StickyNote components
  const [stickyNotes, setStickyNotes] = useState([0, 1, 2]);

  return (
    <div className="appContainer">
      {/* Use map to return and render an array of StickyNote components */}
      {stickyNotes.map((noteId) => (
        <StickyNote key={noteId} />
      ))}
    </div>
  );
}

export default App;
