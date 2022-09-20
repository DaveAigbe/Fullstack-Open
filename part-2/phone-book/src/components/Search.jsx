const Search = ({searchFieldHandler}) => {
    return (
        <section>
            <label htmlFor={'search'}>Search: </label>
            <input id={'search'} onChange={searchFieldHandler}/>
        </section>
    );
};

export default Search