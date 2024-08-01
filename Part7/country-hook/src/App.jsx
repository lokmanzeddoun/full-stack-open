import React, { useState } from "react";
import { useField, useCountry } from "./hooks";

const Country = ({ country }) => {
	if (!country) {
    return <div>not found...</div>;
	}

  return (
		<div>
			<h3>{country.data.name.common} </h3>
			<div>capital {country.data.capital} </div>
			<div>population {country.data.population}</div>
			<img
				src={country.data.flags.png}
				height="100"
				alt={`flag of ${country.data.name.common}`}
			/>
		</div>
	);
};

const App = () => {
	const nameInput = useField("text");
	const [name, setName] = useState("");
	const country = useCountry(name);

	const fetch = (e) => {
		e.preventDefault();
		setName(nameInput.value);
	};

	return (
		<div>
			<form onSubmit={fetch}>
				<input {...nameInput} />
				<button>find</button>
      </form>
			<Country country={country} />
		</div>
	);
};

export default App;
