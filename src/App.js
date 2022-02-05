import { useState } from "react";

import Form from './components/Form'
import './App.css';

function App() {
  const [description, setDescription] = useState("Choose a city and submit to see its description.")
  const [currentWeather, setWeather] = useState("Choose a city and submit to see its current weather.")

  return (
    <div className="App">
      <Form 
        setDescription={setDescription}
        setWeather={setWeather}
      />
      <p>{description}</p>
      <p>{currentWeather}</p>
    </div>
  );
}

export default App;
