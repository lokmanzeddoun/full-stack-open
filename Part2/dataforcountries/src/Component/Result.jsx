import Display from "./Display";
import OneDisplay from "./OneDisplay";

const Result = ({ country, result }) => {
	let filtered = [];

	if (country !== "") {
		filtered = result.filter((result) =>
			result.name.common.toLowerCase().includes(country.toLowerCase())
		);
	} else {
		filtered = result;
	}

	if (filtered.length > 10) {
		return "Too many matches, specify another filter";
	} else if (filtered.length === 1) {
		return filtered.map((result) => (
			<OneDisplay key={result.name.common} result={result} />
		));
	} else {
		return filtered.map((result) => (
			<Display key={result.name.common} result={result} />
		));
	}
};

export default Result;
