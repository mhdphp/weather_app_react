//import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

// build an Weather App
// connect to a database
// API connect - get data about weather in json format
// State is a javascript object that holds the current state of information
// dynamic data
// in our app will use Hooks to hancle the weather data state

// useEffect hook tells our component app to do something after rendering
function App() {
  
  // State hook
  const [allData, setAllData] = useState({
    city: '',
    country: '',
    temperature:''
  });

  // useEffect hook
  useEffect( ()=>{
    // we add what we want to happen after rendering
    // fetch the database information into the API call
    fetchData();
    // put this array to prevent calling the fetchData over and over again
  }, []);

  // https://home.openweathermap.org/api_keys
  const fetchData = async() => {
    const APIKEY = '73cd9a5978e2edb36b1237edec6cf8c9';
    const city = 'Atlanta';
    // axios is a library which will allow to make requests to the server / database
    const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`);
    await setAllData({
      city:result.data.name,
      country: result.data.sys.country,
      temperature:result.data.main.temp
    });
  }

  return (
    <div className="App">
      {console.log('This is a test', allData.country, allData.temperature)}
    </div>
  );
}

export default App;