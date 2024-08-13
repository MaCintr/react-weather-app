import React, { useState, useEffect } from 'react';

const WeatherForecast = ({ city, apiKey }) => {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const fetchForecast = async () => {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
      console.log(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
      const data = await response.json();
      setForecast(data.list);
    };

    fetchForecast();
  }, [city, apiKey]);

  return (
    <div>
      <div className='container d-flex row'>
        <h2>5-Day Forecast</h2>
        {forecast ? (
          forecast.map((item, index) => (
            <div key={index} className='col-md-3 mb-4 container my-3 border border-dark bg-light py-2 bg-opacity-10 rounded px-5'>
              <p>{item.dt_txt}</p>
              <p>Temp: {(item.main.temp).toFixed(1)}°C</p>
              <p>Weather: {item.weather[0].description}</p>
            </div>
          ))
        ) : (
          <p>City not found...</p>
        )}
      </div>
    </div>
  );
};

export default WeatherForecast;
