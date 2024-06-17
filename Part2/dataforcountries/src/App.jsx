import { useEffect, useState } from "react";
import axios from "axios";
import Result from "./Component/Result";
function App() {
	const [country, setCountry] = useState("");
	const [result, setResult] = useState([]);
	const handleChange = (e) => {
		setCountry(e.target.value);
	};
	useEffect(() => {
		axios
			.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
			.then((res) => {
				setResult(res.data);
			});
	}, []);
	return (
		<>
			<li style={{ display: "inline-block", marginRight: "10px" }}>
				Find Country
			</li>
			<input value={country} onChange={handleChange} />
			<div>
				<Result key={result.id} result={result} country={country} />
			</div>
		</>
	);
}

export default App;
