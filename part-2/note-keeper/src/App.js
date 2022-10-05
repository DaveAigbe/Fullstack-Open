import './App.css';
import Note from './components/Notes';
import axios from 'axios';
import {useEffect, useState} from 'react';

async function getData(setNotes) {
    const res = axios.get('http://localhost:3001/notes')
    const data = (await res).data
    setNotes(data)
}

const App = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        return () => {
            getData(setNotes)
        };
    }, []);



    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {notes.map(note =>
                    <Note key={note.id} note={note}/>
                )}
            </ul>
        </div>
    );
};

export default App;
