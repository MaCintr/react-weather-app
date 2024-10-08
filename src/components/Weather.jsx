import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import CurrentWeather from './CurrentWeather';
import WeatherForecast from './WeatherForecast';

/* This aplication uses the OpenWeather API. You can get an API key at https://openweathermap.org/api. */
const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [status, setStatus] = useState('')

    useEffect(() => {
        if (city) {
            fetchWeatherData(city);
        }
    }, [city]);

    useEffect(() => {
        localStorage.setItem('city', city);
    }, [city]);

    const fetchWeatherData = async (city) => {
        const apiKey = '' /*Insert your API key here*/;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        setStatus()
        if (response.statusText === 'OK') {
            const data = await response.json();
            setWeatherData(data);
        } else {
            const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
            const wrapper = document.createElement('div');
            const type = 'danger';
            console.log(response.message)
            const message = `An unexpected error occurred. Error code: ${(response.status)}`;
            wrapper.innerHTML = [
                `<div class="alert alert-${type} alert-dismissible fade show" role="alert">`,
                `   <div>${message}</div>`,
                '   <button type="button" class="btn-close" aria-label="Close"></button>',
                '</div>'
            ].join('');

            alertPlaceholder.append(wrapper);

            const removeAlert = () => {
                wrapper.remove();
            };

            const closeButton = wrapper.querySelector('.btn-close');
            closeButton.addEventListener('click', removeAlert);
        }
    };

    return (
        <div className='container my-4 d-flex flex-column justify-content-center'>
            <h1 className='my-2'>Weather App</h1>
            <SearchBar setCity={setCity} />
            {weatherData && (
                <div className='main-data'>
                    <CurrentWeather data={weatherData} />
                    <WeatherForecast city={city} apiKey={''} /* Insert your API key here */ />
                </div>
            )}
            <div id="liveAlertPlaceholder"></div>
        </div>
    );
};

export default WeatherApp;
