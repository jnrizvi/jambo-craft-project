import { useState } from "react";
import axios from 'axios';
import styled from 'styled-components';

export default function QueryForm({ setDescription, setWeather }) {
  const [option, setOption] = useState("");
  const optionsList = ["", "London", "Paris", "Berlin", "Seattle", "Edmonton"];

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
    <Form onSubmit={handleSubmit}>
      <Label>
        Select a city:
        <Select value={option} onChange={(e) => setOption(e.target.value)}>            
          {optionsList.map((item, index) => {
            return <option key={index} defaultValue={optionsList[0]}>{item}</option> 
          })}
        </Select>
        <input type="submit" value="Go" />
      </Label>
      
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  
`;

const Label = styled.label`
  display: flex;
  justify-content: space-between;
  font-family: 'Nunito Sans', sans-serif;
  flex-grow: 1;
`;

const Span = styled.span`
  // margin-right: 0.25rem;
`;

const Select = styled.select`
  flex-grow: 0.9;
`;

const Input = styled.input`
  border-width:0px;
  border: none;
  border-radius: 0.5rem;
`;