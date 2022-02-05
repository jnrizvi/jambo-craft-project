import { useState } from "react";
import axios from 'axios';

export default function Form({ setDescription, setCurrentWeather }) {
  const [option, setOption] = useState("");
  const optionsList = ["", "London", "Paris", "Berlin", "New York", "Edmonton"];

  const handleSubmit = (event) => {
    // alert('The city you chose is: ' + option);
    axios.get('/api/city', {
      params: {
        name: option,
        labels: []
      }
    })
      .then(res => {
        setDescription(res.data.description)
        setCurrentWeather(res.data.currentWeather)
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