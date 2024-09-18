import React, { useState, useEffect } from 'react';

const WeatherForecast = ({ city, apiKey }) => {
  const [groupedForecast, setGroupedForecast] = useState({});

  useEffect(() => {
    const fetchForecast = async () => {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
      const data = await response.json();

      if (data.cod === 200) {
        const grouped = data.list.reduce((acc, item) => {
          const date = new Date(item.dt * 1000).toLocaleDateString();

          if (!acc[date]) {
            acc[date] = [];
          }

          acc[date].push(item);
          return acc;
        }, {});

        setGroupedForecast(grouped);
      };
    }

    fetchForecast();
  }, [city, apiKey]);

  return (
    <div>
      <div className='container d-flex row justify-content-center'>
        <h2>5-Day Forecast</h2>
        {Object.keys(groupedForecast).length > 0 ? (
          Object.entries(groupedForecast).map(([date, items], index) => (
            <div key={index} className='col-md-12 mb-4 shadow weather-forecast'>
              <h3>{date}</h3>
              <div className='row'>
                {items.map((item, idx) => {
                  const time = new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  return (
                    <div key={idx} className='col-md-3 mb-4'>
                      <h4>{time}</h4>
                      <h2>{(item.main.temp).toFixed(1)}°C</h2>
                      <p>{item.weather[0].description}</p>
                    </div>
                  );
                })}
              </div>
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
