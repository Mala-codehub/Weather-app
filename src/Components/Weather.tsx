import React, { useEffect, useState } from 'react';
import axios from 'axios';
import sun from '../assets/icons/sun.png';
import cloud from '../assets/icons/cloud.png';
import fog from '../assets/icons/fog.png';
import rain from '../assets/icons/rain.png';
import snow from '../assets/icons/snow.png';
import storm from '../assets/icons/storm.png';
import wind from '../assets/icons/windy.png';
import { useStateContext } from './WeatherContext'; 
import Background from './background';
const Weather: React.FC = () => {
  const { weather, setWeather } = useStateContext();  // Get weather and setWeather from context
  const [city, setCity] = useState<string>('Chennai'); // Local state for city, default 'Chennai'
  const [error, setError] = useState<string>(''); // Error handling state
  const [icon, setIcon] = useState(sun); // Default weather icon

  useEffect(() => {
    if (weather?.iconString) {
      const condition = weather.iconString.toLowerCase();
      if (condition.includes('cloud')) {
        setIcon(cloud);
      } else if (condition.includes('rain')) {
        setIcon(rain);
      } else if (condition.includes('clear')) {
        setIcon(sun);
      } else if (condition.includes('thunder')) {
        setIcon(storm);
      } else if (condition.includes('fog')) {
        setIcon(fog);
      } else if (condition.includes('snow')) {
        setIcon(snow);
      } else if (condition.includes('wind')) {
        setIcon(wind);
      } else {
        setIcon(sun); // Fallback to sun icon
      }
    }
  }, [weather?.iconString]);

  // Fetch weather data based on city input
  const fetchWeather = async () => {
    const API_KEY = '80bb7770cc487888cb21e47fa36d6c16'; // Replace with your OpenWeather API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      const weatherData = {
        temp: data.main.temp,
        weather: data.weather[0].main,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        pressure: data.main.pressure,
        iconString: data.weather[0].main, // Get weather condition for icon
      };

      setWeather(weatherData); // Set the global weather data
      setError(''); // Clear error if data is fetched successfully
    } catch (err) {
      setError('City not found! Please try again.');
      setWeather(null); // Reset weather data on error
    }
  };

  return (
    <div className="weather-container" style={{ textAlign: 'center', marginTop: '20px', position: 'relative' }}>
      {/* Render the background */}
      <Background />
  
      <h1>Weather App</h1>
      <input
        className="weather-input"
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="weather-button" onClick={fetchWeather}>Get Weather</button>
  
      {/* Display weather data */}
      {weather && (
        <div className="weather-card" style={{ position: 'relative', zIndex: 10 }}>
          <img src={icon} alt="Weather icon" style={{ width: '100px', height: '100px' }} />
          <h2>{`Temperature: ${weather.temp}°C`}</h2>
          <h3>{`Weather: ${weather.weather}`}</h3>
          <p>{`Humidity: ${weather.humidity}%`}</p>
          <p>{`Wind Speed: ${weather.windSpeed} m/s`}</p>
          <p>{`Pressure: ${weather.pressure} hPa`}</p>
        </div>
      )}
  
      {/* Display error message if any */}
      {error && <p className="weather-error" style={{ color: 'red', zIndex: 10 }}>{error}</p>}
    </div>
  );
};

export default Weather;
