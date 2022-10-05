import {Fragment} from 'react';

const Person = ({name, number}) => {
    return (
        <>
            <td>{name}</td>
            <td>{number}</td>
        </>
    );
};

export default Person;
