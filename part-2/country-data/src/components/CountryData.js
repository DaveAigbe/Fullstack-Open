import React, {useEffect, useState} from 'react';
import axios from 'axios';


const key = process.env.REACT_APP_API_KEY;

const getData = async (name) => {
    const res = await axios.get(`http://api.weatherstack.com/current?access_key=${key}&query=${name}`);
    return await res.data;
};


const MyComponent = ({information}) => {
    const [loading, setLoading] = useState(true);
    const [weather, setWeather] = useState([]);

    const name = information.name.common;
    const capital = information.capital[0];
    const population = information.population;
    const area = information.area;
    let languages = [];
    const flag = information.flags.png;

    for (const [_, value] of Object.entries(information.languages)) {
        languages.push(value);
    }

    useEffect(() => {
        getData(name).then(data => {
            setWeather(data);
            setLoading(!loading);
        });
    }, []);


    return (
        <>
            {loading ?
                <div>Loading</div>
                :
                <div className={' text-lg font-bold text-orange-400'}>
                    <section>
                        <h2 className={'text-green-300'}>General:</h2>
                        <p className={'text-orange-500'}>Capital: <span className={'text-pink-300'}>{capital}</span></p>
                        <p className={'text-orange-500'}>Population: <span className={'text-pink-300'}>{population}</span></p>
                        <p className={'text-orange-500'}>Area: <span className={'text-pink-300'}>{area}</span></p>
                    </section>
                    <section>
                        <h2 className={'text-green-300'}>Languages:</h2>
                        <ul className={'list-disc text-pink-300'}>
                            {languages.map((language) => <li>{language}</li>)}
                        </ul>
                    </section>
                    <section>
                        <img src={flag} alt={`flag of ${name}`}/>
                    </section>
                    <section>
                        <h2 className={'text-green-300'}>Weather in {name}:</h2>
                        <div className={'text-pink-300 flex justify-center items-center flex-col'}>
                            <p className={'text-orange-500'}>Temperature: <span className={'text-pink-300'}>{weather.current.temperature} Celsius</span></p>
                            <img className={'rounded'} src={weather.current.weather_icons[0]} alt="logo of current weather"/>
                            <p className={'text-orange-500'}>Wind: <span className={'text-pink-300'}>{weather.current.wind_speed} m/s</span></p>
                        </div>
                    </section>
                </div>
            }
        </>
    );
};

export default MyComponent;
