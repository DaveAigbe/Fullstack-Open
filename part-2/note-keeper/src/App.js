import './App.css';
import Note from './components/Note';
import {useEffect, useState} from 'react';
import notesService from './services/notesService';
import {Notification} from './components/Notification';


const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('You can add a "services" folder to handle request types and export them after.');
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

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

                setSuccessMessage(`Note was successfully added to server!`);
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 5000);
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
                setErrorMessage(`Note '${note.content}' was already removed from server`);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
                setNotes(notes.filter(n => n.id !== id));
            });
    };


    return (
        <div>
            <h1>Notes</h1>
            <Notification color={'red'} message={errorMessage}/>
            <Notification color={'green'} message={successMessage}/>
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
