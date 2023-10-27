import React, { useState } from 'react'
import "./WeatherApp.css"

import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import humidity_icon from "../Assets/humidity.png";
import rain_icon from "../Assets/rain.png";
import search_icon from "../Assets/search.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";


const WeatherApp = () => {

let api_key = "dd94f859a0e52d6e4767fddf735f04a7";

// handling weather icon starts here
const [wicon,setWicon] = useState(cloud_icon);
// handling weather icon ends here

const search = async () => {
  const element =document.getElementsByClassName("cityInput")
  if(element[0].value==="")
  {
    return 0;
  }
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

  try {
    let errors = document.getElementById("change")
    let temps = document.getElementById("temp")
    let mes = document.getElementById("element")
    let icon = document.getElementById("weather-image")
    let response = await fetch(url);

    if (response.status === 404) {
      temps.style.display = "none"
      errors.textContent = "The specified city does not exist.";
      errors.style.fontSize = "16px";
      // errors.style.color = "red"
      errors.style.paddingTop = "160px"
      errors.style.paddingBottom = "160px"
      mes.style.display = "none"
      icon.style.display = "none"
      // alert("The specified city does not exist.");
      return;
    }

    if (response.status !== 200) {
      alert("An error occurred while fetching data.");
      return;
    }

    let data = await response.json();

    if (!data || !data.main) {
      alert("Weather data is not available for this location.");
      return;
    }

  // let response = await fetch(url);
  // let data = await response.json();
  const humidity =document.getElementsByClassName("humidity-percent");
  const wind = document.getElementsByClassName("wind-rate");
  const temprature = document.getElementsByClassName("weather-temp");
  const location = document.getElementsByClassName("weather-location");

  humidity[0].innerHTML = data.main.humidity+" %";
  wind[0].innerHTML = Math.floor(data.wind.speed)+" km/h";  
  temprature[0].innerHTML = Math.floor(data.main.temp)+" °C";
  location[0].innerHTML = data.name;

// before I had this -> data.wind.speed+" km/h"; now we needed to remove the decimals that is why its like this ->
// Math.floor(data.wind.speed)+" km/h" , Math.floor(data.main.temp)" °C"


  // handling weather icon starts here

  if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n")
  {
    setWicon(clear_icon);
  }
  else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n")
  {
    setWicon(cloud_icon);
  }
  else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n")
  {
    setWicon(drizzle_icon);
  }
  else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n")
  {
    setWicon(drizzle_icon);
  }
  else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n")
  {
    setWicon(rain_icon);
  }
  else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n")
  {
    setWicon(rain_icon);
  }
  else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n")
  {
    setWicon(snow_icon);
  }
  else
  {
    setWicon(clear_icon);
  }
// handling weather icon ends here
} catch (error) {
  alert("An error occurred while fetching data.");
  console.error(error);
}


}
  return (
    <div className='container'>
        <div className="top-bar">
            <input type="text" className="cityInput" placeholder='Search' />
            <div className="search-icon" onClick={()=>(search())}>
                <img src={search_icon} alt="" />
            </div>
        </div>
      <div className="weather-image" id='weather-image'>
        <img width={130} src={wicon} alt="" />
      </div>
      <div className="weather-temp" id='temp'>29°c</div>
      <div className="weather-location" id='change'>Kenya</div>
      <div className="data-container" id='element'>
        <div className="element">
          <img src={humidity_icon} alt="" className='icon' />
          <div className="data">
            <div className="humidity-percent">68%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element" id=''>
          <img src={wind_icon} alt="" className='icon' />
          <div className="data">
            <div className="wind-rate">20 km/hr</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp