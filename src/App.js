import { useState } from "react";
import styled from "styled-components";
import QueryForm from './components/QueryForm';
import './App.css';

function App() {
  const [description, setDescription] = useState("Choose a city and submit to see its description.")
  const [currentWeather, setWeather] = useState("Choose a city and submit to see its current weather.")

  return (
    <AppContainer>
      <WidgetTitle>Trip Planner</WidgetTitle>
      <Widget>
        <QueryForm 
          setDescription={setDescription}
          setWeather={setWeather}
        />
        <Text>{description}</Text>
        <Text style={{ flexGrow: 1 }}>{currentWeather}</Text>
      </Widget>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  font-family: 'Nunito Sans', sans-serif;
  background: #0052D4;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #6FB1FC, #4364F7, #0052D4);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #6FB1FC, #4364F7, #0052D4); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const Widget = styled.div`
  width: 25%;
  height: 30rem;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;

const WidgetTitle = styled.h1`
  color: white;
  font-weight: bold;
`;

const Text = styled.p`
  // height: 35%;
  padding: 1rem;
  margin-bottom: 0;
  color: dimgray;
  background-color: whitesmoke;
  font-size: 14px;
  line-height: 1.5rem;
  text-justify: inter-word;
  // overflow: scroll;
  border-radius: 0.5rem;
`;