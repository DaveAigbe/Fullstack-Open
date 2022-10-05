import Person from './Person';

const ContactList = ({persons, search}) => {
    return (
        <table className={'text-left w-full'}>
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
                                <Person name={person.name} number={person.number}/>
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    );
};

export default ContactList;
