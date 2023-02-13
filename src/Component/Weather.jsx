


import { useEffect, useState } from "react"
import{Container,Row,Col,Form,Card,Button} from "react-bootstrap"
import location from "../Icons/location.png"
import thermometer from "../Icons/thermometer.png"
import drop from"../Icons/drop.png"
import wind  from"../Icons/wind.png"
import clear from "../Icons/clear-sky.png"
import cloudy from "../Icons/cloud-computing.png"

const Weather = () => {
let [city,setCity]=useState()
const [query,setQuery]=useState("")
let [weather,setWeather]=useState({})

let [lon,setLon]=useState(1)
let [lat,setLat]=useState(1)


 const fetchCity= async (event)=>{
    if(event.key==="Enter"){
    event.preventDefault()
   try{
    let res= await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=dde538e04dda6d568c769ea8c004743f`)
    let data= await res.json()
    if(res.ok){
   setCity(data[0])
        setLat(data[0].lat)
        setLon(data[0].lon)
    
fetchTemp(lat,lon)


    console.log(city)
    // fetchTemp(lat,lon)
    }else{
        console.log("error")
    }
   }catch(err){
    console.log(err)
   }
 }
}  
let fetchTemp= async (lat,lon)=>{

    try{
    let res= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=dde538e04dda6d568c769ea8c004743f`)
    let data= await res.json()
    if(res.ok){
        console.log(data)
  setWeather(data)
  console.log(lat)
  console.log(lon)
    }else{
        console.log("error")
    }

    }catch(err){
        console.log(err)
    }

}



useEffect(()=>{
  fetchTemp(lat,lon)

  console.log(city)
},[city])
const getImg=(cloudiness)=>{
   if(cloudiness<10){
    return <img className="weather" src={clear}></img>
   }
   if(cloudiness>0){
    return <img className="weather" src={cloudy}></img>
   }

}
const toCelsius=(temp)=>{
  let Cel=temp-273.15
  return Math.floor(Cel)
}
    return (
        <>
                <Form >

<Form.Group controlId="formBasicPassword" >

  <input className="serach" value={query}
  onChange={event=>setQuery(event.target.value)}
  onKeyDown={fetchCity}
  type="text" placeholder="Search Location..." />

</Form.Group>

      </Form>
      <small>Type the city name</small>
      { city==null 
? <div></div>
:

<div>
<Container className="mt-3">
    <Row className="ml-5">
        <Col sm={12} md={4} lg={4}>
          <h4><img className="icon" src={location}alt="" /> {city.name},{city.state}</h4>
          <div className="d-flex"><img className="therm"  src={thermometer} alt="" />
          <h1 className="h1">{toCelsius(weather.main.temp)}°C</h1>
          </div>
           <p>Max:{toCelsius(weather.main.temp_max)}°C,Min:{toCelsius(weather.main.temp_min)}°C</p>
        </Col>
        <Col sm={12} md={4} lg={4}>
     {getImg(weather.clouds.all)}

        </Col>
        <Col sm={12} md={4} lg={4}>
            <h1> { weather.weather[0].description}</h1>
           <p><img className="icon" src={drop} alt="" /> {weather.main.humidity}%</p>
           {/* <p><img src="" alt="" /> {weather.visibility/100}%</p> */}
           <p><img className="icon"  src={wind} alt="" /> {weather.wind.speed}</p>
        </Col>
    </Row>
</Container>
</div>


      }


   </> 
)
    }

export default Weather;
