import React, { useState, useEffect } from 'react';

const CurrentWeather = ({ data }) => {
    const [bgColor, setBgColor] = useState(''); 
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const weather = data.weather[0].description;
        let newBgColor = '';
        let newImageSrc = '';

        if (weather === 'clear sky'|| weather === 'few clowds') {
            newBgColor = 'bg-info';
            newImageSrc = 'https://static.vecteezy.com/system/resources/previews/022/287/838/original/3d-rendering-sun-icon-3d-render-sunny-weather-icon-sun-png.png';
        } else if (weather === 'broken clouds' || weather === 'scattered clouds') {
            newBgColor = 'bg-light';
            newImageSrc = 'https://static.vecteezy.com/system/resources/previews/022/287/843/original/3d-rendering-sun-covered-by-clouds-icon-3d-render-cloudy-weather-with-sun-icon-sun-covered-by-clouds-png.png';
        } else if (weather === 'overcast clouds') {
            newBgColor = 'bg-secondary';
            newImageSrc = 'https://static.vecteezy.com/system/resources/previews/022/451/261/original/cloud-icon-3d-render-png.png';
        }

        setBgColor(newBgColor);
        setImageSrc(newImageSrc);
    }, [data.weather]);

    return (
        <div className={`my-4 d-flex align-items-center justify-content-center border border-dark bg-opacity-10 rounded px-5 ${bgColor}`}>
            <div className='me-5'>
                <h2>Current Weather in {data.name}</h2>
                <p>Temperature: {(data.main.temp - 273.15).toFixed(1)}°C</p>
                <p>Weather: {data.weather[0].description}</p>
                <p>Humidity: {data.main.humidity}%</p>
                <p>Wind Speed: {data.wind.speed} m/s</p>
            </div>
            <img
                className='img-fluid float-end w-50 h-50 ms-5'
                src={imageSrc}
                alt='weather'
            />
        </div>
    );
};

export default CurrentWeather;
