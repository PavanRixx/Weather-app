
import { icon } from "@fortawesome/fontawesome-svg-core";
import { useEffect, useRef, useState } from "react";

function App() {

  const inputRef = useRef();
  const imgRef = useRef();
  let [iconData ,setIconData] = useState();
  const [weatherData, setWeatherData] = useState('');
  
  const search = async (location)=>{
    if(location === ''){
      alert('Enter city Name');
      return;
    }
    let weatherIcon = {
      "01d": "https://openweathermap.org/img/wn/01d@2x.png",
      "02d": "https://openweathermap.org/img/wn/02d@2x.png",
      "03d": "https://openweathermap.org/img/wn/03d@2x.png",
      "04d": "https://openweathermap.org/img/wn/04d@2x.png",
      "09d": "https://openweathermap.org/img/wn/09d@2x.png",
      "10d": "https://openweathermap.org/img/wn/10d@2x.png",
      "11d": "https://openweathermap.org/img/wn/11d@2x.png",
      "13d": "https://openweathermap.org/img/wn/13d@2x.png",
      "50d": "https://openweathermap.org/img/wn/50d@2x.png",
      "01n": "https://openweathermap.org/img/wn/01n@2x.png",
      "02n": "https://openweathermap.org/img/wn/02n@2x.png",
      "03n": "https://openweathermap.org/img/wn/03n@2x.png",
      "04n": "https://openweathermap.org/img/wn/04n@2x.png",
      "09n": "https://openweathermap.org/img/wn/09n@2x.png",
      "10n": "https://openweathermap.org/img/wn/10n@2x.png",
      "11n": "https://openweathermap.org/img/wn/11n@2x.png",
      "13n": "https://openweathermap.org/img/wn/13n@2x.png",
      "50n": "https://openweathermap.org/img/wn/50n@2x.png"
    };
    
    try{
      const urlKey = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=36c3295b5afbde810703723488778a1b`;
  
      const responce = await fetch(urlKey);
      // console.log(responce);
      
      const data = await responce.json();
        if(!responce.ok){
        alert(data.message);
        return;
      }
  
      console.log(data);
      setWeatherData({
        humidity : data?.main?.humidity,
        windSpeed: data?.wind?.speed,
        temperature: Math.floor(data?.main?.temp),
        location: data?.name,
        description: data?.weather[0]?.description,
        icon: data.weather[0].icon
      });
    
        
        let getIocn = weatherData.icon;
         setIconData(setWeatherData.icon)

        //  console.log(inputRef);
        //  console.log(imgRef);
        //  console.log(imgRef.current.src);
         console.log(data.weather[0].icon);
         console.log(weatherIcon[getIocn]);
         console.log(weatherData.icon);
         
         
        }catch(error){
          // setWeatherData(false);
          console.error('Error in fetching weather data '+ error);
    
      }
    }
    useEffect(()=>{
      search("Location");
    },[])

      
      
return (
    <>
      <div className="app">
        <h2 className="headding">WEATHER APP</h2>
        <div className="search">
          <input type="text" className="input" placeholder='Enter Location' ref={inputRef} />
          <button  className="btn" onClick={()=> search(inputRef.current.value)}>Search</button>
        </div>

         {/* container  */}
        {weatherData ? <>
          <div className="container">
            <div className="top">
              <div className="location">
                <p>{weatherData?.location}</p>
              </div>
              <div className="temperature">
                <h1>{weatherData?.temperature}<sup>o</sup>C</h1>
              </div>
              <div className="image">
                <img src= {iconData} ref={imgRef} alt="icon" />
              </div>
              <div className="description">
                <p>{weatherData.description}</p>
              </div>
            </div>
            <div className="bottom bold" >
              <div className="feels">
                <p>30<sup>o</sup>C</p>
                <p>Feels like</p>
              </div>
              <div className="humidity">
                <p>{weatherData.humidity}</p>
                <p>Humidity</p>
              </div>
              <div className="wind">
                <p className='bold'>{weatherData.windSpeed} Km/h</p>
                <p>Wind speed</p>
              </div>
            </div>
          </div>
        </>: <><div className="container"><h1>Enter location</h1></div></>}
      </div>
    </>
  )
}

export default App
