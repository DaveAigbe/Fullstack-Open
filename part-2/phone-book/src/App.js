import {useEffect, useState} from 'react';
import Search from './components/Search';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import axios from 'axios';

const getData = async (setPersons) => {
    const res = axios.get('http://localhost:3001/persons');
    const data = (await res).data;

    setPersons(data);
};

const App = () => {

    useEffect(() => {
        getData(setPersons);
    }, []);


    const [persons, setPersons] = useState([]);
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
        <div className={'h-screen w-screen bg-amber-300 flex flex-col items-center justify-center gap-6'}>
            <header className={'underline font-bold text-2xl'}>
                <h1>Phonebook</h1>
            </header>
            <div
                className="bg-amber-500 transition shadow-2xl hover:bg-amber-600 flex flex-col items-center justify-center rounded-md gap-6 p-2">
                <Search persons={persons} searchFieldHandler={searchFieldHandler} search={search}/>
                <ContactForm submitForm={submitForm} nameFieldHandler={nameFieldHandler} numberFieldHandler={numberFieldHandler}/>
                <ContactList persons={persons} search={search}/>
            </div>
        </div>
    );
};

export default App;
