import React from 'react';
import './App.css';
import Weather from './Components/Weather';
import { WeatherProvider } from './Components/WeatherContext'; 
import MiniCard from './Components/minicard';
const App: React.FC = () => {
  return (
    <WeatherProvider>
      <div className="App">
        <Weather />
      </div>
    </WeatherProvider>
  );
};

export default App;
