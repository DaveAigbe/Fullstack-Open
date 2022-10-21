import express from 'express';
// import notes from './notes.json' assert {type: 'json'}; // 1.
import {readFileSync} from 'fs'

/*
 * 1. In order for json to be imported as module, it must be asserted with json type
 * 2. Alternatively, it can just be parsed from readFileSync
 * 3. the colon indicates a named route parameter that will be stored and accessible from an object
 * 4. The object they are stored in is req.params, so it would look like:: req.params -> {id: 1}, if user entered 1
 * 5. If the object is found send back the json object otherwise throw out could not find 404 and give a specific error message
 * 6. Alter the original json data with filter to delete a resource
 */

let notes = JSON.parse(readFileSync('./notes.json', 'utf-8')) // 2.

const app = express();
const PORT = 3001

app.get('/api', (req, res) => {
    res.send('' +
        '<div style="height: 100vh; width: 100vw; display: flex; align-items: center; justify-content: center; color: darkblue;">' +
        '<h1>Welcome to the main page!</h1>' +
        '</div>'
    );
});

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.get('/api/notes/:id', (req, res) => { // 3.
    const id = req.params.id // 4.

    const note = notes.find(note => String(note.id) === id)

    note ? res.json(note) : res.status(404).send('' +
        '<div style="height: 100vh; width: 100vw; display: flex; align-items: center; justify-content: center; color: red;">' +
        '<h1>The note you are looking for does not exist!</h1>' +
        '</div>')// 5.
})

app.delete('/api/notes/:id', (req, res) => { // 3.
    const id = req.params.id
    const toDelete = notes.find(note => String(note.id) === id)
    notes = notes.filter(note => String(note.id) !== id) // 6.

    res.status(204).send(toDelete).end()
})




app.listen(PORT, () => {
    console.log(`App is now listening on port ${PORT}`)
})
