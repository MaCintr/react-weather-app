import WeatherApp from './components/Weather';
import React from 'react';
import './App.css';

function App() {
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      const htmlTag = document.documentElement;
      htmlTag.setAttribute('data-bs-theme', savedTheme);
    }
  }, []);

  return (
    <WeatherApp/>
  );
}

export default App;
