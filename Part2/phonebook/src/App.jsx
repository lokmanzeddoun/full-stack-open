/* eslint-disable react/prop-types */
import { useState } from "react";

const Filter = ({ text, value, handleNewChange }) => {
	return (
		<div>
			{text} <input value={value} onChange={handleNewChange} />
		</div>
	);
};

const Button = ({ type, text, handleNewChange }) => {
	return (
		<button type={type} onClick={handleNewChange}>
			{text}
		</button>
	);
};

const Input = ({ text, value, handleNewChange }) => {
	return (
		<div>
			{text} <input value={value} onChange={handleNewChange} />
		</div>
	);
};

const PersonForm = ({
	onSubmit,
	newName,
	newNumber,
	handleNewName,
	handleNewNumber,
}) => {
	return (
		<form onSubmit={onSubmit}>
			<Input text="name:" value={newName} handleNewChange={handleNewName} />
			<Input
				text="number:"
				value={newNumber}
				handleNewChange={handleNewNumber}
			/>
			<Button text="add" type="submit" />
		</form>
	);
};

const Persons = ({ personAfterFilter }) => {
	return <div>{personAfterFilter}</div>;
};

const Person = ({ name, number }) => {
	return (
		<p>
			{name} {number}
		</p>
	);
};

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [newFilter, setNewFilter] = useState("");

	const filter = () => {
		return persons.filter((p) =>
			p.name.toLowerCase().includes(newFilter.toLowerCase())
		);
	};

	const personAfterFilter = filter().map(({ id, name, number }) => (
		<Person key={id} name={name} number={number} />
	));

	const submitForm = (e) => {
		e.preventDefault();
		for (let p of persons) {
			if (p.name === newName) {
				return alert(`${p.name} is already added to phonebook`);
			}
		}
		const newPerson = {
			id: persons.length + 1,
			name: newName,
			number: newNumber,
		};
		setPersons(persons.concat(newPerson));
		setNewName("");
		setNewNumber("");
	};

	const handleNameChange = (e) => {
		setNewName(e.target.value);
	};

	const handleNumberChange = (e) => {
		setNewNumber(e.target.value);
	};

	const handleFilterChange = (e) => {
		setNewFilter(e.target.value);
	};

	return (
		<div>
			<h2>Phonebook</h2>

			<Filter
				text="filter shown with"
				value={newFilter}
				handleNewChange={handleFilterChange}
			/>

			<PersonForm
				onSubmit={submitForm}
				newName={newName}
				newNumber={newNumber}
				handleNewName={handleNameChange}
				handleNewNumber={handleNumberChange}
			/>
			<h2>Numbers</h2>
			<Persons personAfterFilter={personAfterFilter} />
		</div>
	);
};

export default App;
