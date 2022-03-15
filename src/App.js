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
  
  const [searchCity, setSearchCity] = useState('');
  const [allData, setAllData] = useState({
    city: '',
    country: '',
    temperature:'',
    humidity:'',
    minTemperature:'',
    weatherIcons:''
  });

  // useEffect hook
  useEffect( ()=>{
    // we add what we want to happen after rendering
    // fetch the database information into the API call
    fetchData();
    // put this array to prevent calling the fetchData over and over again
  }, []);

  // https://home.openweathermap.org/api_keys
  const fetchData = async(city) => {
    try {
      const APIKEY = '9b77cbe0427c2adf900d17172c';
      //const city = 'London'; // for testing purposes
      // axios is a library which will allow to make requests to the server / database
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`);

      // let Ctemp = Math.round(result.data.main.temp - 274.15); // conver temperature to Celsius
      let Ctemp = Math.round(result.data.main.temp*10)/10; // round 1 decimal
      //Ctemp = String(Ctemp) + "C"; // convert Ctemp to string

      await setAllData({
        city:result.data.name,
        country: result.data.sys.country,
        temperature:Ctemp,
        humidity: result.data.main.humidity,
        minTemperature: result.data.main.temp_min,
        weatherIcons: result.data.weather[0].icon
      });  
    } catch (error) {
      console.log('API not loaded correctly or loaded for the first time.');
    }
  }

  const handleSubmit = (event) => {
    console.log(searchCity);
    event.preventDefault();
    fetchData(searchCity);
  }

  const handleChange = (event) => {
    event.preventDefault();
    setSearchCity(event.target.value);
  }


  return (
    // section tag in react
    // main tag for the main build
    <main>
      <div className="App">
        <div>
          <form onSubmit={handleSubmit}>
            <input type='text' name='city' placeholder='Location' value={searchCity} onChange={handleChange} />
            <button for='city'>Search</button>
          </form>
        </div>
        
        <section id="weather">
          <div>
            <img id='weather-img' src={'http://openweathermap.org/img/wn/' 
                        + allData.weatherIcons + '@2x.png'} />
            <h2>{allData.city}</h2>
            <h2>{allData.country}</h2>
          </div>
          <div id='weatherData' >
            <div class='weatherParam'>
              <h4>Humidity</h4>
              <p>{allData.humidity} %</p>
            </div>
            <div class='weatherParam'>
              <h4>Temperature</h4>
              <p>{allData.temperature} °C</p>
            </div>
            <div class='weatherParam'>
              <h4>Min - Temperature</h4>
              <p>{allData.minTemperature} °C</p>
            </div>
          </div>
          
        </section>

      </div>
      
    </main>
  );
}

export default App;