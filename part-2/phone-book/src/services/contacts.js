import axios from 'axios';

const url = 'http://localhost:3001/persons';


const getAll = async () => {
    const res = await axios.get(url);
    return await res.data
};

const addContact = async (newContact) => {
    return await axios.post(url, newContact);
};

const deleteContact = async (id) => {
    const res = await axios.delete(`${url}/${id}`)

    return res.status
}


const editContact = (id, newObject) => {
    const res = axios.put(`${url}/${id}`, newObject)
    return res.then((response) => alert(response.status));
};

export {getAll, addContact, deleteContact, editContact};

