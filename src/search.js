import React, { useEffect, useState } from 'react'
import axios from 'axios';

import './App.css';
export default function Search() {

    const [city,setcity]=useState("")
    const [data,setdata]=useState()
    const [Error,setError]=useState(false)

    const[mem,setmem]=useState([])


    useEffect(()=>{

       
async function main(){
      
   await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1555e19e96a49961ad9799a2f895826f`).then(function (response) {
       
   if(response.data){
    setdata(response.data)
   }
   if(!response.data){
    setError(true)
   }
  

    }).catch(function (error) {
        console.error(error);
    });



}
main()
      
    },[city])



useEffect(()=>{

    if(data&&city.length==data.name.length){

     setmem([...mem,data.name])
      
       
    }
   

},[data])
console.log(mem)

    
       
    
console.log(data)

  return (
    <div className='search-container'>
    <h1 style={{color:"blue"}}>Weather App</h1>
    <input type="text" placeholder='ENTER CITY NAME' style={{width:"60%",height:"10%"}} onChange={(e)=>{setcity(e.target.value)}}></input>
    




    {data&&city.length>0&&<div>
        <h3 style={{backgroundColor:" rgb(192, 240, 255)"}}>Weather details of city  :{data?data.name:"-"}</h3>
        <h3 style={{backgroundColor:" rgb(192, 240, 255)"}}>Country:{data.sys.country?data.sys.country:"-"}</h3>
  
    
        <h3>Current temperature:{data?parseFloat(data.main.temp-273.15).toFixed(2):"-"}°C</h3>
        <h3>Temperature range:{data?parseFloat(data.main.temp_min-273.15).toFixed(2):"-"}°C to {data?parseFloat(data.main.temp_max-273.15).toFixed(2):"-"}°C </h3>
       
        <h3>Humidity : {data.main.humidity?parseInt(data.main.humidity).toFixed(2):"-"}</h3>
        <h3>Sea Level : {data.main.sea_level?parseInt(data.main.sea_level):"-"}</h3>
        
        <h3>Ground Level Level : {data.main.grnd_level?parseInt(data.main.grnd_level):"-"}</h3>

        </div>
       

    }
   

    {!data&&city.length>=1&&<div>
<h1 style={{color:"white",backgroundColor:"red"}}>ENTER VALID CITY NAME</h1>
        </div>


    }

    {
        mem.length>0&&city.length==0&&<div >

        <h1 style={{color:"blue"}}>Last 3 City Entries</h1>

            {
                mem.map((data,i)=>{
                    if(i>3){
                        return
                    }
                    return(
                        
                        <h3>{mem[mem.length-i-1]}</h3>
                    )
                })
           
            }

        </div>



    }


    </div>
  )
}
