const Person = ({name, number, id, handleDelete}) => {
    return (
        <>
            <td>{name}</td>
            <td>{number}

                <button onClick={() => handleDelete(id)}
                        className={'ml-1 bg-red-500 hover:bg-red-600 text-white p-0.5 rounded-lg'}>Delete
                </button>
            </td>
        </>
    );
};

export default Person;
