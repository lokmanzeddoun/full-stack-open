/* eslint-disable react/prop-types */
import Weather from "./Weather";
// import AllWeather from "./AllWeather";

const OneDisplay = ({ result }) => {
	const keys = Object.keys(result.languages);
	return (
		<div>
			<div>
				<h1>{result.name.common}</h1>
				<p>capital : {result.capital[0]}</p>
				<p>area : {result.area}</p>
				<h3>languages:</h3>
				<ul key={keys.id}>
					{keys.map((keys) => (
						<li key={keys.id}>{result.languages[keys]}</li>
					))}
				</ul>
				<img src={result.flags.png} alt="flag" height="200" width="250" />
			</div>
			<Weather result={result} />
		</div>
	);
};

export default OneDisplay;
