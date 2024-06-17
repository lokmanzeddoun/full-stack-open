/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ result }) => {
	const [allWeather, setAllWeather] = useState(null);

	useEffect(() => {
		const api_key = import.meta.env.VITE_WEATHER_API_KEY;
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${result.capital[0]}&appid=${api_key}`
			)
			.then((response) => {
				setAllWeather(response.data);
			});
	}, []);

	if (allWeather === null) return null;

	return (
		<div>
			<h2>{`weather in ${result.capital[0]}`}</h2>
			<p>{`tempeature ${(allWeather.main.temp - 273.5).toFixed(2)} Celcius`}</p>
			<img
				alt="weather icon"
				src={`http://openweathermap.org/img/wn/${allWeather.weather[0].icon}@2x.png`}
			/>
			<p>{`wind ${allWeather.wind.speed} m/s`}</p>
		</div>
	);
};

export default Weather;
