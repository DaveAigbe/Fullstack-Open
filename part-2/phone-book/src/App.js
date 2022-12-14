import {useEffect, useReducer, useRef, useState} from 'react';
import {addContact, deleteContact, editContact, getAll} from './services/contacts';
import Search from './components/Search';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import {Icon} from '@iconify/react';
import {AlertMessage} from './components/AlertMessage';

const reducer = (state, action) => {
    switch (action.type) {
        case 'handleSearch': {
            return {...state, search: action.payload};
        }
        case 'handlePersons': {
            return {...state, persons: action.payload};
        }
        case 'handleDelete': {
            const deletePerson = state.persons.find(person => person.id === action.payload);

            if (window.confirm(`Are you sure you want to delete ${deletePerson.name}`)) {
                deleteContact(action.payload)
                    .then((res) => console.log(res))
                    .catch((err) => console.log(err));

                const updatedPersons = state.persons.filter((contact) => contact.id !== action.payload);
                return {...state, persons: updatedPersons};
            }
            return
        }
        case 'handleExisting': {
            // Grab person by their id
            const changePerson = state.persons.find(person => person.id === action.payload);
            // Find the index of that person
            const changePersonIndex = state.persons.indexOf(changePerson);

            if (window.confirm(`${changePerson.name} is already added to phonebook, replace the old number with new one?`)) {
                editContact(action.payload, action.person)
                    .then((res) => console.log(res))
                    .catch((err) => console.log(err));
            }

            // Create a new copy of previous array and update the information at the index found above
            const updatedPersons = [...state.persons];
            updatedPersons[changePersonIndex] = action.person;

            return {...state, persons: updatedPersons};
        }
        default: {
            return state;
        }
    }
};


const App = () => {
    const [state, dispatch] = useReducer(reducer, {persons: [], search: ''});
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(null);
    const nameRef = useRef('');
    const numberRef = useRef('');

    useEffect(() => {
        getAll().then((data) => {
            setLoading(false);
            handlePersons(data);
        })
            .catch((error) => console.log(error));
    }, []);

    const handleSearchField = function (event) {
        dispatch({
            type: 'handleSearch',
            payload: event.target.value
        });
    };

    const handlePersons = (newPersons) => {
        dispatch({
            type: 'handlePersons',
            payload: newPersons
        });
    };

    const handleDelete = (id) => {
        dispatch({
            type: 'handleDelete',
            payload: id
        });
    };

    const handleExisting = (id, updatedPerson) => {
        dispatch({
            type: 'handleExisting',
            payload: id,
            person: updatedPerson
        });
    };

    const submitForm = function (event) {
        event.preventDefault();
        const findDuplicate = state.persons.filter(person => person.name.toLowerCase() === nameRef.current.value.toLowerCase());

        if (findDuplicate.length === 0) {
            const newPerson = {name: nameRef.current.value, number: numberRef.current.value, id: state.persons.length + 1};
            addContact(newPerson)
                .then((response) => alert(response.statusText))
                .catch(error => alert(error.message));

            const newList = [...state.persons, newPerson];
            handlePersons(newList);

            setAlert(`${nameRef.current.value} has been added to the phonebook.`)
            setTimeout(() => {
                setAlert('')
            }, 5000)
        } else {
            const updatedPerson = {name: nameRef.current.value, number: numberRef.current.value, id: findDuplicate[0].id};
            handleExisting(findDuplicate[0].id, updatedPerson);
        }
        document.getElementById('name').value = '';
        document.getElementById('number').value = '';
    };

    return (
        <div className={'h-screen w-screen bg-amber-300 flex flex-col items-center justify-center gap-6'}>
            {loading ?
                (
                    <>
                        <Icon className={'text-blue-700 text-8xl'} icon="line-md:loading-twotone-loop" color="blue"/>
                    </>
                )
                :
                (
                    <>
                        <header className={'underline font-bold text-2xl'}>
                            <h1>Phonebook</h1>
                        </header>
                        <div
                            className="bg-amber-500 transition shadow-2xl hover:bg-amber-600 flex flex-col items-center justify-center rounded-md gap-6 p-2"
                        >
                            {alert && <AlertMessage message={alert} color={alert.includes('added') ? 'green' : 'red' }/>}
                            <Search persons={state.persons} searchFieldHandler={handleSearchField} search={state.search}/>
                            <ContactForm submitForm={submitForm} nameRef={nameRef} numberRef={numberRef}/>
                            <ContactList persons={state.persons} handleDelete={handleDelete} search={state.search}/>
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default App;
