import React from 'react';
import CountryLabel from './CountryLabel';

const CountriesList = ({searchData}) => {
    return (
        <div className={'flex gap-5 flex-col justify-center items-center'}>
            {searchData.map((country) =>
                <div key={Math.random() * 1000} className={'mb-2'}>
                    <CountryLabel information={country}/>
                </div>
            )
            }
        </div>
    );
};

export default CountriesList;
