import {Fragment} from 'react';
import Person from './Person';

const ContactList = ({persons, search}) => {
    return (
        <section className={'contact_list'}>
            <header>
                <h2>Contacts</h2>
            </header>
            <ul>
                {persons.filter(person => person.name.toLowerCase().includes(search))
                    .map((person) => {
                        return (
                            <Fragment key={person.id}>
                                <Person name={person.name} number={person.number}/>
                            </Fragment>
                        );
                    })}
            </ul>
        </section>
    );
};

export default ContactList;