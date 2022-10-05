const Search = ({searchFieldHandler}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th className={'text-center'}>Search Filter</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><label htmlFor={'search'}>Search: </label></td>
                    <td><input className={'border-amber-900 border-2'} id={'search'} onChange={searchFieldHandler}/></td>
                </tr>
            </tbody>
        </table>
    );
};

export default Search;
