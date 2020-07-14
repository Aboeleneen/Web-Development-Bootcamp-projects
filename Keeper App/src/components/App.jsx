import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  function addItem(newNote) {
    setNotes(prevState => [...prevState, newNote]);
  }

  function deleteItem(id) {
    setNotes(prevState => {
      prevState.filter((note, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea addItem={addItem} />
      {notes.map((note, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={note.title}
            content={note.content}
            deleteItem={deleteItem}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
