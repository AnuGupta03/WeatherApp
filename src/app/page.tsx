'use client'
import { useState } from "react";
import axios from 'axios';


export default function Home() {
  const [searchText, setSearchText] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);

  const handleInputChange = (e: any) => {
    setSearchText(e.target.value);
  }
  const fetchWeatherData = async (city: string) => {
    try {
      const apiKey = 'e0577a21f4be7985fa0201f1413ef9d5';
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      const roundedTemp = Math.round(response.data.main.temp);
      setWeatherData({...response.data, main: {...response.data.main, temp: roundedTemp}});
    } catch (error) {
      console.log("Error Fetching weather data:", error);
      setWeatherData(null);  
    }
  }

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter'){
      fetchWeatherData(searchText);
    }
  }

  return (
    <div className="w-full h-screen bg-gradient-to-b from-gradientStart to-gradientEnd flex justify-center items-start">
      <div className="h-auto w-28 mt-12">
        <img className="mb-4" src="https://play-lh.googleusercontent.com/jgRxxSNZWjiG9pGQNIoE0F-9Xgn7BzvgeyCXb-55TnR7sixhfOsLStXcZLlMwPheaic" alt="Weather app" />
       <div className="flex flex-col items-center">
       <h2 className="mb-4 text-yellow-400 text-2xl whitespace-nowrap"><strong>Weather App</strong><sub className="text-black text-xs">   by Anuradha</sub>
        </h2>
        <input 
        type="text" 
        placeholder="Search" 
        value={searchText} 
        onChange={handleInputChange} 
        onKeyDown={handleSearch}
        className="flex flex-col items-center text-left pr-48 pl-48 pt-2 pb-2 rounded-lg bg-gradient-to-b from-gradientStart to-gradientEnd"/>
        {weatherData && (
            <div className="flex flex-col items-center mt-4 p-10 rounded-3xl shadow-lg bg-gradient-to-b from-[#0f0c29] to-[#302b63] text-white">
              <h3 className="font-semibold text-4xl whitespace-nowrap flex">{weatherData.name} 
                <span className="text-sm bg-yellow-600 text-white ml-2 rounded-full w-8 h-6 flex items-center justify-center">{weatherData.sys.country}</span></h3>
              <p className="ml-2 font-bold text-6xl mt-6 whitespace-nowrap flex ">{weatherData.main.temp}
                <span className="text-3xl ml-1 ">°C</span></p>
                <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    alt={weatherData.weather[0].description}
                    />
              <p className="text-lg mt-2 capitalize">{weatherData.weather[0].description}</p>
            </div>
        )}
       </div>
      </div>
    </div>
  );
}
