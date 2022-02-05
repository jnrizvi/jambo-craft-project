import { useState } from "react";
import axios from 'axios';

export default function Form({ setDescription, setWeather }) {
  const [option, setOption] = useState("");
  const optionsList = ["", "London", "Paris", "Berlin", "California", "Edmonton"];

  const handleSubmit = (event) => {
    axios.get('/api/cityInfo', {
      params: {
        name: option
      }
    })
      .then(res => {
        setDescription(res.data.description)
        let weatherSummary = `Currently ${res.data.weather.current}°C with a high of ${res.data.weather.high}°C and a low of ${res.data.weather.low}°C`
        setWeather(weatherSummary)
      })
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Choose a city:
        <select value={option} onChange={(e) => setOption(e.target.value)}>            
          {optionsList.map((item, index) => {
            return <option key={index} defaultValue={optionsList[0]}>{item}</option> 
          })}
        </select>
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}