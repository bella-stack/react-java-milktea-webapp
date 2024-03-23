import React, { useState, useEffect } from 'react';
import './Weather.css';

const api = {
    key: "773b061018c2fcc2f5403e0ed3bae00f",
    base: "https://api.openweathermap.org/data/2.5/",
};

const WeatherApi = ({ textSize }) => { // Receive textSize as a prop
    const [weather, setWeather] = useState({});

    useEffect(() => {
        fetch(`${api.base}weather?q=College Station&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then(result => {
                setWeather(result);
            });
    }, []);

    const currentTemperature = Math.round(weather.main?.temp);

    // Dynamic style based on textSize
    const weatherStyle = {
        fontSize: `${textSize}%`,
    };

    return (
        <div className="weather-container border-2 p-5 pt-16" style={weatherStyle}>
            <p className='CENTERTEXT'>Current temperature at</p>
            <h2>{weather.name}:</h2>
            <div className="big-temperature">{currentTemperature}°C</div>
            <div className="temperature-details">
                <div className='flex justify-center gap-7'>
                    <p>H: {Math.round(weather.main?.temp_max)}°C</p>
                    <p>L: {Math.round(weather.main?.temp_min)}°C</p>
                </div>
                <p>{weather.weather?.[0]?.description}</p>
            </div>
        </div>
    );
};

export default WeatherApi;
