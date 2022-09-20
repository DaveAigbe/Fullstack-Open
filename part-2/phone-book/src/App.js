import './App.css';
import {useState} from 'react';
import Search from './components/Search'
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456', id: 1},
        {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        {name: 'Dan Abramov', number: '12-43-234345', id: 3},
        {name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [search, setSearch] = useState('');

    const nameFieldHandler = function (event) {
        setNewName(event.target.value);
    };

    const numberFieldHandler = function (event) {
        setNewNumber(event.target.value);
    };

    const searchFieldHandler = function (event) {
        setSearch(event.target.value);
    };

    const submitForm = function (event) {
        event.preventDefault();
        const emptyDuplicate = persons.map((person) => person.name)
            .filter(person => person === newName);

        console.log(emptyDuplicate);

        if (emptyDuplicate.length === 0) {
            const newList = [...persons, {name: newName, number: newNumber, id: persons.length + 1}];
            setPersons(newList);
            window.alert(`${newName} has been added to the phonebook.`);

            setNewName('');
            document.getElementById('name').value = '';
            document.getElementById('number').value = '';
        } else {
            window.alert(`${newName} already exists!`);
        }
    };

    return (
        <div className={'App'}>
            <header>
                <h1>Phonebook</h1>
            </header>
            <Search persons={persons} searchFieldHandler={searchFieldHandler} search={search}/>
            <ContactForm submitForm={submitForm} nameFieldHandler={nameFieldHandler} numberFieldHandler={numberFieldHandler}/>
            <ContactList persons={persons} search={search}/>
        </div>
    );
};

export default App;