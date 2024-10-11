import React, { useEffect, useState } from 'react';
import { useStateContext } from './WeatherContext'; 

// Importing background images
import Clear from '../assets/images/Clear.jpg';
import Fog from '../assets/images/fog.png';
import Cloudy from '../assets/images/Cloudy.jpg';
import Rainy from '../assets/images/Rainy.jpg';
import Snow from '../assets/images/snow.jpg';
import Stormy from '../assets/images/Stormy.jpg';
import Sunny from '../assets/images/Sunny.jpg';

const Background: React.FC = () => {
  const { weather } = useStateContext(); // Get weather data from context
  const [image, setImage] = useState<string>(Clear); // Default background image

  useEffect(() => {
    if (weather?.weather) {  // Check if weather data exists and is valid
      const conditions = weather.weather.toLowerCase();

      // Set the background image based on weather conditions
      if (conditions.includes('clear')) {
        setImage(Clear);
      } else if (conditions.includes('cloud')) {
        setImage(Cloudy);
      } else if (conditions.includes('sunny')) {
        setImage(Sunny);
      } else if (conditions.includes('rain') || conditions.includes('shower')) {
        setImage(Rainy);
      } else if (conditions.includes('snow')) {
        setImage(Snow);
      } else if (conditions.includes('fog')) {
        setImage(Fog);
      } else if (conditions.includes('thunder') || conditions.includes('storm')) {
        setImage(Stormy);
      } else {
        setImage(Clear); // Fallback image if conditions don't match
      }
    } else {
      setImage(Clear); // Default image if weather is not available
    }
  }, [weather]);

  return (
    <div 
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1
      }}
    />
  );
};

export default Background;
