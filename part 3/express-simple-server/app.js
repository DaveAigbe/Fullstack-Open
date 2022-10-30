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
 * 7. Without the json-parser, the body property would be undefined. The json-parser functions so that it takes the JSON data
 *    of a request, transforms it into a JavaScript object and then attaches it to the body property of the request
 * 8. If the notes are not empty, get the maximumId from the notes, so that the new note can be given a unique id.
 *    So pull out all the ids using map, then find the largest value, otherwise if it is empty, set it to 0
 * 9. If the POST request body is empty, throw an error
 * 10. It is better to let the server handle creating dates because the users time could be set up improperly
 */

// let notes = JSON.parse(readFileSync('./notes.json', 'utf-8')) // 2.

let notes = [
    {
        "id": 1,
        "content": "HTML is easy",
        "date": "2022-05-30T17:30:31.098Z",
        "important": true
    },
    {
        "id": 2,
        "content": "Browser can execute only Javascript",
        "date": "2022-05-30T18:39:34.091Z",
        "important": false
    },
    {
        "id": 3,
        "content": "GET and POST are the most important methods of HTTP protocol",
        "date": "2022-05-30T19:20:14.298Z",
        "important": true
    },
    {
        "id": 4,
        "content": "To be deleted",
        "date": "2022-05-30T19:20:14.298Z",
        "important": true
    }
]

function generateId() {
    const maxId = notes.length > 0 // 8.
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}


const app = express();
app.use(express.json()) // 7.
const PORT = 3001

// HOME
app.get('/api', (req, res) => {
    res.send('' +
        '<div style="height: 100vh; width: 100vw; display: flex; align-items: center; justify-content: center; color: darkblue;">' +
        '<h1>Welcome to the main page!</h1>' +
        '</div>'
    );
});

// GET ALL
app.get('/api/notes', (req, res) => {
    res.json(notes)
})

// GET SINGLE
app.get('/api/notes/:id', (req, res) => { // 3.
    const id = req.params.id // 4.

    const note = notes.find(note => String(note.id) === id)

    note ? res.json(note) : res.status(404).send('' +
        '<div style="height: 100vh; width: 100vw; display: flex; align-items: center; justify-content: center; color: red;">' +
        '<h1>The note you are looking for does not exist!</h1>' +
        '</div>')// 5.
})

// ADD SINGLE
app.post('/api/notes', (req, res) => {
    const note = req.body

    if (!note.content) { // 9.
        res.status(400).json({error: 'Content required to complete request.'})
    }

    const noteObj = {
        id: generateId(),
        content: note.content,
        date: new Date(),
        important: note.important || false
    }

    notes = [...notes, noteObj]
    res.status(201).json(noteObj)
})


// DELETE SINGLE
app.delete('/api/notes/:id', (req, res) => { // 3.
    const id = req.params.id
    const toDelete = notes.find(note => String(note.id) === id)
    notes = notes.filter(note => String(note.id) !== id) // 6.

    res.status(204).send(toDelete).end()
})




app.listen(PORT, () => {
    console.log(`App is now listening on port ${PORT}`)
})
