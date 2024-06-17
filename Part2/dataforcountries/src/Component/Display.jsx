/* eslint-disable react/prop-types */
import { useState } from "react";
import OneDisplay from "./OneDisplay";
const Display = ({ result }) => {
	const [show, setShow] = useState(false);

	const handleShowClick = () => {
		setShow(!show);
	};
	return (
		<li>
			<li>
				{result.name.common} <button onClick={handleShowClick}>show</button>
				{show === true ? (
					<OneDisplay key={result.name.common} result={result} />
				) : null}
			</li>
		</li>
	);
};

export default Display;
