import { useEffect, useState } from 'react'
import { getWeatherByCity } from './services/weather';
import './App.css'


function App() {
  const [weather, setWeather] = useState(null);
  const [error,setError]= useState(null);
  const [bgClass, setBgClass] = useState("day");
  useEffect(()=>{
    getWeatherByCity("Guadalajara")
    .then(setWeather)
    .catch((err)=>{
      console.error("Couldn't obtain the weather:",err);
      setError(err.message);
    })
  },[]);
  useEffect(()=>{
    const hour = new Date().getHours();
    if(hour>= 6 && hour < 18){
      setBgClass("day");
    }else if(hour>=18 && hour <=20){
      setBgClass("afternoon");
    }else{
      setBgClass("night");
    }
  },[]);
  if(error) return <p style={{color:"red"}}>⚠️ {error}</p>
  if(!weather) return <p>Loading ...</p>

  return (
    <div className={`app-container ${bgClass}`}>
      <div className="weather-container">

  <div className="top-section">
    <div className="left-info">
      <p className="city">{weather.city}, {weather.country}</p>
      <p className="temperature">
        {weather.temp}
        <span className="unit">°F</span>
      </p>
    </div>

    <img
      className="image"
      src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
      alt={weather.desc}
      width={120}
    />
  </div>

  <p className="sky">{weather.desc}</p>

</div>

    </div>
  );
    
}

export default App
