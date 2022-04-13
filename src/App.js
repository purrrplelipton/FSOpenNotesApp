import React, {useState, useEffect} from "react";

import Note from './components/Note/Note'
import Notification from './components/Notification/Notification'
import Footer from "./components/Footer/Footer";
import noteService from './services/notes'
import './App.css';

const App = () => {
  const [items, setItems] = useState({
    notes: [],
    newNote: "",
    showAll: true,
    errorMessage: null
  });

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setItems({
          ...items,
          notes: initialNotes
        })
      });
  }, []);

  const addNote =  (event) => {
    event.preventDefault();

    const noteObject = {
      content: items.newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: items.notes.length + 1
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setItems({
          ...items,
          notes: items.notes.concat(returnedNote),
          newNote: "",
          errorMessage: "Added a new note."
        });
        setTimeout(() => {
          setItems({
            ...items,
            errorMessage: null
          });
        }, 5000);
      });
  }

  const handleNoteChange = (event) => {
    setItems({
      ...items,
      newNote: event.target.value});
  }

  const importanceHandler = id => {
    const note = items.notes.find(n => n.id === id);
    const changedNote = {...note, important: !note.important};
  
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setItems({
          ...items,
          notes: items.notes.map(n => n.id !== id ? n : returnedNote)
        });
      })
      .catch(error => {
        setItems({
          ...items,
          errorMessage: `Note '${note.content}' was already removed from server`
        });
        setTimeout(() => {
          setItems({
            ...items,
            errorMessage: null
          })
        }, 5000);
        setItems({...items, notes: items.notes.filter(n => n.id !== id)});
      });
  }

  const notesToShow = items.showAll
    ? items.notes
    : items.notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={items.errorMessage} />
      <div>
        <button
          onClick={
            () => setItems({
              ...items,
              showAll: !items.showAll
            })
          }
        >
          show {items.showAll ? 'important' : 'all' }
        </button>
      </div>   
      <div>
        {
          notesToShow.map(note => 
            <Note
              key={note.id}
              note={note}
              clicked={() => importanceHandler(note.id)}
            />
          )
        }
      </div>
      <form onSubmit={addNote}>
        <input value={items.newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
};

export default App