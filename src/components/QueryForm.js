import { useState } from "react";
import axios from 'axios';
import styled from 'styled-components';

export default function QueryForm({ setDescription, setWeather }) {
  const [option, setOption] = useState("London");
  const optionsList = ["London", "Paris", "Berlin", "Seattle", "Edmonton"];

  const handleSubmit = (event) => {
    axios.get('/api/cityInfo', {
      params: {
        name: option
      }
    })
      .then(res => {
        setDescription(res.data.description)
        let weatherSummary = `The weather in ${option} is currently ${res.data.weather.current}°C with a high of ${res.data.weather.high}°C and a low of ${res.data.weather.low}°C`
        setWeather(weatherSummary)
      })
    event.preventDefault();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        <Select value={option} onChange={(e) => setOption(e.target.value)}>            
          {optionsList.map((item, index) => {
            return <option key={index} defaultValue={optionsList[0]}>{item}</option> 
          })}
        </Select>
        <Input type="submit" value="Search" />
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

const Select = styled.select`
  flex-grow: 0.95;
`;

const Input = styled.input`
  border: none;
  border-radius: 0.25rem;
  color: white;
  background-color: #4364F7;
  transition: 0.2s;
  &:hover {
    background-color: #6FB1FC;
  }
`;