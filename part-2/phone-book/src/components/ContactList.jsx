import Person from './Person';

const ContactList = ({persons, search, handleDelete}) => {
    return (
        <table className={'text-left w-full spacing'}>
            <thead>
                <tr>
                    <th>Contacts</th>
                </tr>
            </thead>
            <tbody>
                {persons.filter(person => person.name.toLowerCase().includes(search))
                    .map((person) => {
                        return (
                            <tr key={person.id}>
                                <Person name={person.name} number={person.number} id={person.id} handleDelete={handleDelete}/>
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    );
};

export default ContactList;
