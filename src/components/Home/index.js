import React,{useEffect, useState} from 'react'
import axios from 'axios'
import './index.css'

const Home = () => {

    const [weatherData,setWeatherData] = useState()
    const [location,setLocation] = useState('')
    const [city,setCity] = useState('')

    

    useEffect(() => {
        console.log("You are inside");
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
    
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=d2f5964521a28db70dfd9da33299b5b0&units=metric`)
              .then((response) => {
                const { name } = response.data;
                console.log("name", name);
                setLocation(name);
              })
              .catch((error) => {
                console.log(error);
              });
          },
          (error) => {
            console.log(error);
          }
        );
      }, []);
    
      useEffect(() => {
        const fetchData = async () => {
            try {
              if (location) {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=d2f5964521a28db70dfd9da33299b5b0`);
                console.log("location city response", response);
                return response;
              }
            } catch (error) {
              console.log(error);
            }
          };
        
          fetchData().then((data) => {
            console.log("location city weather", data);
            setWeatherData(data);
          });

          console.log('weatherData',weatherData )
      }, [location]);


      

      const handleInputKeyDown = event =>{
        if (event.key === 'Enter') {
          console.log('entered handleInputKeyDown - Enter key pressed');
          setLocation(event.target.value);
        }
      }



  return (
    <div className="app">
      <div className="search">
        <input
          value={city}
          onChange={event => setCity(event.target.value)}
          onKeyDown={handleInputKeyDown}
          
          //onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        

        {weatherData !== undefined &&
          <div className="bottom">
            <p>{weatherData.data.name}</p>
            <div>
              <img src ={`https://openweathermap.org/img/wn/${weatherData.data.weather[0].icon}@2x.png`} alt ='' />
              <p>{weatherData.data.weather[0].description}</p>
            </div>
            
            <div className="bottom2">
              <div className="feels">
                {weatherData ? <p className='bold'>{weatherData.data.main.temp.toFixed()}°F</p> : null}
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                {weatherData ? <p className='bold'>{weatherData.data.main.humidity}%</p> : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {weatherData ? <p className='bold'>{weatherData.data.wind.speed} MPH</p> : null}
                <p>Wind Speed</p>
            </div>

            </div>
            
          </div>
        }



      </div>
      
      
    </div>
  )
}

export default Home
