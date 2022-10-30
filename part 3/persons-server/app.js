/*
* 1. Import the express module
* 2. Import the file system module, so that json information can be interacted with
* 3. Import the JSON file, it will automatically be parsed into a javascript object to be used
* 3*. Read the information from the JSON and parse the JSON string into JS object
* 4. Helper function to generate a new ID based off of the length of the contacts array
* 5. Create an instance of the express class that will be used to interact with the http server
* 6. app.use is middleware that will be called each time a new request is made
* 7. express.json parses incoming request JSON strings and places the parsed data into req.body to be used
* 8. Middleware is a function that gets called on each request, and completes some tasks before executing the actual logic.
*    It receives the response, request, and a next() function that moves it on to the next piece of middleware. They are
*    executed in the same order that they are called, basically synchronously, so order is important.
* 9. Middleware can also be called after the route logic, usually to catch request that are made to non-existent routes
* 10. Using the HTTP request logger morgan with the custom token
*
* */

const express = require('express'); // 1.
const fs = require('fs'); // 2.
const contacts = require('./contacts.json'); // 3.
const morgan = require('morgan')

// fs.readFile('./contacts.json', 'utf-8', (err, data) => { // 3*.
//     if (err) {
//         return console.log(err);
//     }
//     try {
//         contacts = JSON.parse(data);
//     } catch (err) {
//         console.log('Error parsing contacts.json: ', err);
//     }
// });


const generateId = () => { // 4.
    if (contacts) {
        return contacts.length + 1;
    } else {
        return 1;
    }
};

const duplicateExists = (person) => {
    if (person.name && person.number) {
        const findDuplicate = contacts.find(contact => contact.name === person.name);
        return !!findDuplicate;
    }
    return false;
};

// const reqLogger = (req, res, next) => { // 8.
//     console.log('Method: ', req.method)
//     console.log('Path: ', req.path)
//     console.log('Body: ', req.body)
//     console.log('---')
//     next()
// }

const unknownEndpoint = (req, res) => { // 9.
    res.status(404).json({error: 'Endpoint does not exist'})
}

morgan.token('contact', (req) => {
    return JSON.stringify(req.body)
})

const app = express(); // 5.
const PORT = 3001;

app.use(express.json()); // 6. // 7.
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :contact')) // 10.


// GET ALL
app.get('/api/persons', (req, res) => {
    res.json(contacts);
});

// GET DETAIL
app.get('/api/persons/:id', (req, res) => {
    const person = contacts.find(contact => contact.id === Number(req.params.id));

    if (person) {
        res.json(person);
    } else {
        res.status(404).send('Contact does not exist.');
    }
});

// GET INFO
app.get('/info', (req, res) => {
    const dateString = new Date(Date.now());
    res.send(`Phonebook has info for ${contacts.length} people. \n ${dateString}`);
});

// POST NEW
app.post('/api/persons', (req, res) => {
    const data = req.body;

    const newPerson = {
        id: generateId(),
        name: data.name,
        number: data.number
    };

    if (data) {
        if (!duplicateExists(newPerson)) {
            const updatedContacts = [...contacts, newPerson];
            fs.writeFile('./contacts.json', JSON.stringify(updatedContacts), (err) => {
                if (err) {
                    return console.log(err);
                }
            });
            res.status(201).json(newPerson);
        } else {
            res.status(400).json({error: 'Name must be unique'});
        }
    } else {
        res.status(400).send('Contact is invalid format.');
    }

});

// DELETE DETAIL
app.delete('/api/persons/:id', (req, res) => {
    const person = contacts.find(contact => contact.id === Number(req.params.id));

    if (person) {
        const updatedContacts = contacts.filter(contact => contact !== person);
        fs.writeFile('./contacts.json', JSON.stringify(updatedContacts), (err) => {
            if (err) {
                return console.log(err);
            }
        });
        res.status(200).send(`${person.name} has successfully been deleted`);
    } else {
        res.status(404).send('Contact does not exist.');
    }
});


app.use(unknownEndpoint) // 9.

app.listen(PORT, () => {
    console.log(`App is currently listening on ${PORT}`);
});
