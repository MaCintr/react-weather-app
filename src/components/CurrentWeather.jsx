import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCircleCheck } from "react-icons/fa6";

const CurrentWeather = ({ data }) => {
    console.log(data)
    const [bgColor, setBgColor] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [fadeClass, setFadeClass] = useState('fade'); // Gerencia o fade-in e fade-out

    useEffect(() => {
        const weather = data.weather[0].description;
        let newBgColor = '';
        let newImageSrc = '';

        if (weather === 'clear sky' || weather === 'few clouds') {
            newBgColor = 'bg-info';
            newImageSrc = 'https://static.vecteezy.com/system/resources/previews/022/287/838/original/3d-rendering-sun-icon-3d-render-sunny-weather-icon-sun-png.png';
        } else if (weather === 'broken clouds' || weather === 'scattered clouds') {
            newBgColor = 'bg-info';
            newImageSrc = 'https://static.vecteezy.com/system/resources/previews/022/287/843/original/3d-rendering-sun-covered-by-clouds-icon-3d-render-cloudy-weather-with-sun-icon-sun-covered-by-clouds-png.png';
        } else if (weather === 'overcast clouds' || weather === 'haze' || weather === 'fog' || weather === 'mist') {
            newBgColor = 'bg-secondary';
            newImageSrc = 'https://static.vecteezy.com/system/resources/previews/022/451/261/original/cloud-icon-3d-render-png.png';
        } else if (weather === 'light rain' || weather === 'moderate rain') {
            newBgColor = 'bg-dark';
            newImageSrc = 'https://cdn3d.iconscout.com/3d/premium/thumb/rain-8572946-6777722.png';
        }

        setBgColor(newBgColor);
        setImageSrc(newImageSrc);

        // Mostra o alerta com fade-in
        setShowAlert(true);
        setFadeClass('fade show'); // Adiciona a classe `show` para o fade-in
        const fadeOutTimer = setTimeout(() => {
            setFadeClass('fade'); // Remove a classe `show` para o fade-out
            setTimeout(() => setShowAlert(false), 150); // Remove o alerta após o fade-out terminar
        }, 5000); // Duração do alerta

        return () => clearTimeout(fadeOutTimer); // Limpa o temporizador ao desmontar
    }, [data.weather]);

    return (
        <div>
            {showAlert && (
                <div
                    className={`alert alert-success d-flex z-3 position-fixed align-items-center bottom-0 end-0 m-4 ${fadeClass}`}
                    role="alert"
                >
                    <FaCircleCheck 
                    className='me-2'
                    />
                    <div>
                        City found: {data.name} - {data.sys.country}
                    </div>
                </div>
            )}
            <div className={`my-4 d-flex align-items-center justify-content-center border border-light bg-opacity-10 rounded px-5 ${bgColor}`}>
                <div className='me-5'>
                    <h2>Current Weather in {data.name}</h2>
                    <h1 className='fw-light temp'>{(data.main.temp - 273.15).toFixed(1)}°C</h1>
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
        </div>
    );
};

export default CurrentWeather;
