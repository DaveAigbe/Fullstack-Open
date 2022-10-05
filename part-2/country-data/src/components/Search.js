import React from 'react';

const Search = ({handleSearch}) => {
    return (
        <table>
            <tbody>
                <tr>
                    <td><input className={' bg-blue-800 shadow-xl shadow-black-500/50 text-white rounded text-xl p-1.5'}
                               type={'text'} id={'search'} placeholder={'Country'} onChange={handleSearch}/></td>
                </tr>
            </tbody>
        </table>
    );
};

export default Search;
