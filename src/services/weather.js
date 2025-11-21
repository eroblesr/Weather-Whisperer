const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const DEFAULT_PARAMS = "&units=imperial&lang=en";

export async function getWeatherByCity(city){
    const url= `${BASE_URL}/weather?q=${city}${DEFAULT_PARAMS}&appid=${API_KEY}`;
   try{
     const res = await fetch(url);
     const data = await res.json();
     if(data.cod !== 200){
        if(data.cod === "404") throw new Error("City not found");
        if(data.cod === "429") throw new Error("Too many requests - wait a bit");
        throw new Error (data.message || "unexpected error");
     }
     return{
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        humidity: data.main.humidity,
        desc: data.weather[0].description,
        icon: data.weather[0].icon,
        wind: data.wind.speed,
        country: data.sys.country,
        city: data.name
     }

   }catch(err){
     if(err.name === "TypeError"){
        throw new Error("Network Error");
     }
     throw err;

   }
}
