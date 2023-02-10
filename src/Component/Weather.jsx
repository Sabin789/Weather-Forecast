import { useState } from "react"
import{Container,Row,Col,Form} from "react-bootstrap"

const Weather = () => {
let [data,setData]=useState({})
const [query,setQuery]=useState("")
let [weather,setWeather]=useState({})




    const fetchCity= async (e)=>{
        if(e.key==="Enter"){
            e.preventDefault()
       try{
       let res= await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=dde538e04dda6d568c769ea8c004743f`)
        if(res.ok){
       let data1 = await res.json()
      setData(data=data1[0])
      console.log(data)

        }else{
            console.log("error")
        }
 
       }catch(err){
        console.log(err)
       }
    }
    }
    const fetchTemp= async (e)=>{

        if(e.key==="Enter"){
          e.preventDefault()
          let ll=data
          try{
              let res= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${ll.lat}&lon=${ll.lon}&appid=dde538e04dda6d568c769ea8c004743f`)
              console.log(data.lat)
              console.log(data.lon)
              if(res.ok){
                  let temp= await res.json()
                  setWeather(temp)
                  console.log(weather)
      
              }else{
                  console.log("error")
              }
          }catch(err)
          {
              console.log(err)
          }
          
      
      }
      }
const toCelsius=(temp)=>{
   let Cel= temp/100


    console.log(Cel)
   return Cel
}
    return (
        <>
                <Form>

<Form.Group controlId="formBasicPassword">

  <input className="serach"   value={query}
  onChange={e=>setQuery(e.target.value)}
  onKeyDown={fetchCity}
 onKeyUp={fetchTemp}
  type="text" placeholder="Search Location..." />
</Form.Group>
      </Form>
 {  data!==null ? 
    
    
    <div ><h1 className="cloudy">Weather </h1>
    <h3>City </h3>
    <h1 className="temp">Temperature</h1>
    <Container  className="d-flex" >
        <Row >
        <Col md={4} className="info my-5 mx-2">
            <h4>Feels like </h4>
        </Col>
        <Col md={4} className="info my-5 mx-2">
            <h4>Humidity </h4>
        </Col>
        <Col md={4} className="info my-5 mx-2">
            <h4 className="info-text">Visibility </h4>
        </Col>
        </Row>
    </Container>



    </div>
  
    
   
    
    
     :
      <div key={data.lon} >
      <h1 className="cloudy">{weather.weather[0].description}</h1>
      <h3>{data.name}  </h3>
      <h1 className="temp">{weather.main.temp}°C</h1>
      <Container  className="d-flex" >
          <Row >
          <Col md={4} className="info my-5 mx-2">
              <h4>Feels like:{weather.main.feels_like}°C </h4>
          </Col>
          <Col md={4} className="info my-5 mx-2">
              <h4>Humidity:{weather.main.humidity} </h4>
          </Col>
          <Col md={4} className="info my-5 mx-2">
              <h4 className="info-text">Visibility:{toCelsius(weather.visibility)}% </h4>
          </Col>
          </Row>
      </Container>
  
  
  
  
      </div>
    }
</>

    )
}
 
export default Weather;