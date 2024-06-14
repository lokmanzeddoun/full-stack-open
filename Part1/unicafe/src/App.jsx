import { useState } from "react";

const Statistics = ({ data }) => {
	const sum = data.good + data.neutral + data.bad;
	if (sum === 0) {
		return (
			<div>
				<p>No feedback given</p>
			</div>
		);
	}
	return (
		<table border={1}>
			<tbody>
				<StatisticLine text="good" value={data.good} />
				<StatisticLine text="neutral" value={data.neutral} />
				<StatisticLine text="bad" value={data.bad} />
				<StatisticLine text="Total Number of Collected feedback" value={sum} />
				<StatisticLine
					text="The Average Score"
					value={(data.good * 1 + data.neutral * 0 + data.bad * -1) }
				/>
				<StatisticLine
					text="The percentage of positive feedback"
					value={`${parseFloat(data.good / sum) * 100} %`}
				/>
			</tbody>
		</table>
	);
};
const StatisticLine = ({ text, value }) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	);
};
const Button = (props) => {
	return (
		<div>
			<button onClick={props.handleClick}>{props.text}</button>
		</div>
	);
};
const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);
	const data = {
		good,
		neutral,
		bad,
	};
	const handleGoodClick = () => {
		setGood(good + 1);
	};
	const handleNeutralClick = () => {
		setNeutral(neutral + 1);
	};
	const handleBadClick = () => {
		setGood(good + 1);
	};
	return (
		<div>
			<Button handleClick={handleGoodClick} text="Good" />
			<Button handleClick={handleNeutralClick} text="Neutral" />
			<Button handleClick={handleBadClick} text="Bad" />
			<Statistics data={data} />
		</div>
	);
};

export default App;
