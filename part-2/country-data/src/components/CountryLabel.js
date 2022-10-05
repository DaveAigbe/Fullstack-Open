import React, {useState} from 'react';
import CountryData from './CountryData';

const CountryLabel = ({information}) => {
    const [showData, setShowData] = useState(false);

    const displayInfo = () => {
        setShowData(!showData)
    }

    return (
        <div>
            <div className={'flex gap-4 justify-center items-center text-lg font-bold text-white'}>
                {information.name.common}
                <button className={'bg-blue-700 hover:bg-blue-800 text-white px-1 font-bold rounded transition'} onClick={displayInfo}>
                    Show
                </button>
            </div>
            {showData && <CountryData information={information}/>}
        </div>
    );
};

export default CountryLabel;
