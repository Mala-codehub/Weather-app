import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of weather data (same as your WeatherData interface)
interface WeatherData {
  temp: number;
  weather: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  iconString: string;
}

// Define context interface
interface WeatherContextProps {
  weather: WeatherData | null;
  setWeather: React.Dispatch<React.SetStateAction<WeatherData | null>>;
}

// Create the context
const WeatherContext = createContext<WeatherContextProps | undefined>(undefined);

// Create a custom hook to use the WeatherContext
export const useStateContext = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useStateContext must be used within a WeatherProvider');
  }
  return context;
};

// Create a provider component
export const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  return (
    <WeatherContext.Provider value={{ weather, setWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};
