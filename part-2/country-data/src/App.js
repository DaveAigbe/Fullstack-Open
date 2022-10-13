import axios from 'axios';
import {useEffect, useState} from 'react';
import Search from './components/Search';
import RenderCountries from './components/RenderCountries';

async function getData() {
  const res  = axios.get('https://restcountries.com/v3.1/all')
  return (await res).data
}


function App() {
  const [search, setSearch] = useState('');
  const [countryData, setCountryData] = useState([]);
  const [searchData, setSearchData] = useState([])

  useEffect(() => {
    getData().then(data => {
      setCountryData(data)
    })
  }, []);


  function handleSearch(event) {
    setSearch(event.target.value.toLowerCase())
    getSearchData()
  }

  function getSearchData() {
    const newData = countryData.filter((country) => country.name.common.toLowerCase().includes(search))
    setSearchData(newData)
  }

  return (
    <div className={'min-h-screen w-screen flex items-center justify-center bg-blue-700 from-blue-400 bg-gradient-to-r'}>
      <div className={'flex flex-col justify-center items-center text-center gap-4'}>
        <h1 className={'text-3xl font-bold text-white'}>Country Finder</h1>
        <Search handleSearch={handleSearch}/>
        <RenderCountries searchData={searchData} search={search}/>
      </div>
    </div>
  );
}

export default App;
