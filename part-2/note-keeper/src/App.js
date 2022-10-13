import './App.css';
import Note from './components/Note';
import {useEffect, useState} from 'react';
import notesService from './services/notesService';


const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('You can add a "services" folder to handle request types and export them after.');
    // const [showAll, setShowAll] = useState(true);

    useEffect(() => {
        return () => {
            notesService
                .getAll()
                .then(notes => {
                    console.log(notes);
                    setNotes(notes);
                })
                .catch(err => alert('Notes do not exist! ->' + err.message));
        };
    }, []);

    const addNote = (e) => {
        e.preventDefault();

        const noteObject = {
            content: newNote,
            date: new Date(),
            important: Math.random() < 0.5
        };

        notesService
            .create(noteObject)
            .then(res => {
                setNotes([...notes, res]);
                setNewNote('');
            });
    };

    const toggleImportanceOf = (id) => {
        const note = notes.find(n => n.id === id);
        const changedNote = {...note, important: !note.important};

        notesService
            .update(id, changedNote)
            .then(res => {
                setNotes(notes.map(note => note.id !== id ? note : res));
            })
            .catch(() => {
                alert(`the note '${note.content}' was already deleted from server`);
                setNotes(notes.filter(n => n.id !== id));
            });
    };


    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {notes.map(note =>
                    <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
                )}
            </ul>
            <button onClick={e => addNote(e)}>Generate Note</button>
        </div>
    );
};

export default App;
