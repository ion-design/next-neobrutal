
import React, { useState, useEffect } from 'react';
import { Cloud, Sun, Droplets, Wind } from 'lucide-react';
import Alert from '@/components/ui/Alert';

const sampleWeatherData = {
    city: 'New York',
    temperature: 50,
    condition: 'Cloudy',
};

const WeatherCard = () => {
  const [zipCode, setZipCode] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (zipCode.length === 5) {
      fetchWeather();
    }
  }, [zipCode]);

  const fetchWeather = async () => {
    setLoading(true);
    setError('');
    try {
      // Replace with actual API call
    //   const response = await fetch(`https://api.example.com/weather/${zipCode}`);
    //   const data = await response.json();
        //   setWeather(data);
    setWeather(sampleWeatherData);
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const getClothingSuggestion = (temp) => {
    if (temp > 80) return 'Light clothing, shorts, and t-shirt';
    if (temp > 60) return 'Light jacket or long sleeves';
    if (temp > 40) return 'Coat and warm layers';
    return 'Heavy winter coat and warm layers';
  };

  const WeatherIcon = ({ condition }) => {
    switch (condition) {
      case 'Sunny':
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case 'Cloudy':
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case 'Rainy':
        return <Droplets className="h-8 w-8 text-blue-500" />;
      default:
        return <Wind className="h-8 w-8 text-gray-400" />;
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="mb-4">
        <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          placeholder="Enter ZIP code"
          className="w-full p-2 border-2 border-border dark:border-darkBorder rounded-base bg-bg dark:bg-darkBg text-text dark:text-darkText"
        />
      </div>

      {loading && <Alert message="Loading weather data..." />}

      {error && <Alert message={error} className="bg-red-100 text-red-800" />}

      {weather && (
        <div className="bg-main dark:bg-darkBg text-text dark:text-darkText p-6 rounded-base border-2 border-border dark:border-darkBorder shadow-light dark:shadow-dark">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-heading">{weather.city}</h2>
            <WeatherIcon condition={weather.condition} />
          </div>
          <p className="text-3xl font-bold mb-2">{weather.temperature}°F</p>
          <p className="mb-4">{weather.condition}</p>
          <div className="border-t border-border dark:border-darkBorder pt-4">
            <h3 className="text-lg font-heading mb-2">What to Wear</h3>
            <p>{getClothingSuggestion(weather.temperature)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
