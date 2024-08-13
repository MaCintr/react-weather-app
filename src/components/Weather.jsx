import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import CurrentWeather from './CurrentWeather';
import WeatherForecast from './WeatherForecast';

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        if (city) {
            fetchWeatherData(city);
        }
    }, [city]);

    useEffect(() => {
        localStorage.setItem('city', city);
    }, [city]);

    const fetchWeatherData = async (city) => {
        const apiKey = '9578bd051c6400450fc666781d29e68d';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
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

            // Função para remover o alerta
            const removeAlert = () => {
                wrapper.remove();
            };

            // Adiciona o evento de clique ao botão para fechar o alerta
            const closeButton = wrapper.querySelector('.btn-close');
            closeButton.addEventListener('click', removeAlert);
        }
    };

    return (
        <div className='container my-4 d-flex flex-column justify-content-center'>
            <h1 className='my-2'>Weather App</h1>
            <SearchBar setCity={setCity} />
            {weatherData && (
                <>
                    <CurrentWeather data={weatherData} />
                    <WeatherForecast city={city} apiKey={'9578bd051c6400450fc666781d29e68d'} />
                </>
            )}
            <div id="liveAlertPlaceholder"></div>
        </div>
    );
};

export default WeatherApp;
