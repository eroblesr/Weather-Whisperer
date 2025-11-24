import { useEffect, useState } from 'react'
import { getWeatherByCity } from './services/weather';
import './App.css'


function App() {
  const [weather, setWeather] = useState(null);
  const [error,setError]= useState(null);
  const [bgClass, setBgClass] = useState("day");
  const [weatherClass, setWeatherClass] = useState("");
  useEffect(()=>{
    getWeatherByCity("Suiza")
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
  useEffect(()=>{
    if(!weather) return;  
    console.log("MAIN:", weather.main, "DESCRIPTION:", weather.desc, "icon", weather.icon);
    if(weather.main === "Rain" || weather.main ==="Drizzle") setWeatherClass("rainy");
    
    else if(
      weather.main ==="Clouds" || 
      weather.main ==="Mist" || 
      weather.main ==="Haze" || 
      weather.main ==="Fog"  ||
      weather.main ==="Smoke"
    ) setWeatherClass("cloudy");
    else if(weather.main ==="Snow") setWeatherClass("snowy");
    else if(weather.main === "Clear") setWeatherClass("clear");
    else setWeatherClass("default");
  },[weather]);
  
  if(error) return <p style={{color:"red"}}>⚠️ {error}</p>
  if(!weather) return <p>Loading ...</p>

  return (
    <div className={`app-container ${bgClass} ${weatherClass}`}>
      {weatherClass === "rainy" && (
      <div className="rain">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="drop"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${0.5 + Math.random()}s`,
              animationDelay: `${Math.random()}s`,
            }}
          ></div>
        ))}
      </div>
  )}  
   {weatherClass === "cloudy" && (
      <div id="clouds">
        <div className="cloud x1"></div>
        <div className="cloud x2"></div>
        <div className="cloud x3"></div>
        <div className="cloud x4"></div>
        <div className="cloud x5"></div>
      </div>
    )}
    {weatherClass === "snowy" && (
      <div className="tpl-snow">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            style={{
              "--x": Math.random(),
              "--d": Math.random(),
              "--delay": Math.random(),
            }}
          ></div>
        ))}
      </div>
  )}
      <div className="weather-container">

  <div className="top-section">
    <div className="left-info">
      <p className="city">{weather.city}, {weather.country}</p>
      <p className="temperature">
        {Math.round(weather.temp)}
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
