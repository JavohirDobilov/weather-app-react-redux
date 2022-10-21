
import React from "react";
import {useEffect} from "react";
import "./HomePage.css"
import search from "../assets/icons8-search-60.png"
import shar from "../assets/img.png"

import { useState } from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import { getWeather, setLoading } from '../redux/actions/weatherActions'



import { RootStore } from '../redux/store'
import { WeatherData } from '../redux/types'
import axios from "axios";




export const HomePage = ({data,citydata}) =>{


    console.log(data)

    const dispatch = useDispatch()

    const [city,setCity] = useState('')

    useEffect(() => {
       getWeather("Tashkent");
    });
    



    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;



    const handchange = (e) =>{

        e.preventDefault();
        setCity(e.currentTarget.value);
    }


    // @ts-ignore
    const handleSubmit = (e) =>{

        e.preventDefault();
        dispatch(setLoading())
        dispatch(getWeather(city))
        setCity("")

    }

    const handleWeather = (cityname)=>{
        dispatch(getWeather(cityname))
    }

    const celcy =(data?.main?.temp-273.15).toFixed(0)
    return (
        <div className="weather-app">
            <div className="weather-shar">
                <img src={shar} width="300px"/>
            </div>
            <div className="container">
                <h3 className="logo-name">
                    the weather
                </h3>

                <div>
                    <h1 className="temp">{celcy}&#176;</h1>
                    <div className="city-name">
                        <h1 className="name">{data?.name}</h1>
                        <small>
                            <span className="time">{date}</span>


                        </small>
                    </div>
                    <div className="weather">
                        {data.weather && <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} className="" alt="" width="60px"/>}
                        <span className="condition">{data.weather && data.weather[0].description}</span>
                    </div>
                </div>
            </div>

            <div className="panel">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="search"
                        placeholder="Another location"
                        value={city}
                        onChange={handchange}
                    />
                    <button type="submit" className="submit" onSubmit={handleSubmit}>
                        <img src={search} width="30px"/>
                    </button>
                </form>
                <ul className="cities">
                    {citydata.map(item=>(

                        <div className="" key={item.id}>
                            <li onClick={()=>handleWeather(item.name)} className="city">{item.name}</li>
                        </div>
                    ))}
                </ul>
                <ul className="details">
                    <h4>Weather Details</h4>
                    <li>
                        <span>{data.weather && data.weather[0].description}</span>
                        <span>34%</span>
                    </li>
                    <li>
                        <span>Humidity</span>
                        <span>{data.main && data.main.humidity}%</span>
                    </li>
                    <li>
                        <span>Wind</span>
                        <span>{data?.wind?.speed} m/s</span>
                    </li>
                    <li>
                        <span>Rain</span>
                        <span>23%</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default HomePage