/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import personService from "./Services/personService";
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

const Person = ({ name, number, deleteHandler, id }) => {
	return (
		<div>
			<p style={{ display: "inline-block", marginRight: "10px" }}>
				{name} {number}
			</p>
			<Button
				text={"delete"}
				type={"submit"}
				handleNewChange={() => {
					deleteHandler(id);
				}}
			></Button>
		</div>
	);
};

const App = () => {
	const handleOnClickDelete = (id) => {
		const person = persons.find((n) => n._id === id);
		if (window.confirm(`Delete ${person.name} ?`)) {
			personService
				.deletePerson(id)
				.then(() => setPersons(persons.filter((persons) => persons._id !== id)))
				.catch((err) => console.log(err));
		}
	};
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [changeMessage, setChangeMessage] = useState("");
	const [newFilter, setNewFilter] = useState("");
	const [isError, setIsError] = useState(false); // Add state for error tracking
	useEffect(() => {
		personService.getAllPersons().then((d) => setPersons(d));
	}, []);
	const filter = () => {
		return newFilter.length
			? persons.filter((p) =>
					p.name.toLowerCase().includes(newFilter.toLowerCase())
			  )
			: persons;
	};

	const personAfterFilter = filter().map((p) => (
		<>
			<Person
				key={p.name}
				name={p.name}
				number={p.number}
				deleteHandler={handleOnClickDelete}
				id={p._id.toString()}
			/>
		</>
	));

	const submitForm = (e) => {
		e.preventDefault();
		const newPerson = {
			name: newName,
			number: newNumber,
		};
		const p = persons.find(
			(p) => p.name.toLowerCase() === newName.toLowerCase()
		);
		if (p && p.number === newPerson.number) {
			window.alert(`${newName} is already added to phonebook`);
			return;
		} else if (p && p.number !== newPerson.number) {
			const changedPerson = { ...p, number: newPerson.number };
			if (
				window.confirm(
					`${newName} is already added to phonebook, replace the old number with a new one?`
				)
			) {
				personService
					.updatePerson(p._id, changedPerson)
					.then((np) => {
						setChangeMessage(`number of ${newName} is successfully updated`);
						setPersons(persons.map((n) => (n._id !== p._id ? n : np)));
						setNewName("");
						setNewNumber("");
						setTimeout(() => {
							setChangeMessage(null);
						}, 2000);
					})
					.catch((err) => {
						let msg;
						setIsError(true);
						if (err.response.data.type === "ValidationError") {
							msg = err.response.data.error;
						} else {
							msg = `Information of ${newName} has already been removed from server`;
						}
						setChangeMessage(msg);
						setTimeout(() => {
							setChangeMessage(null);
							setIsError(false);
						}, 2000);
					});
				return;
			}
		}

		personService
			.createPerson(newPerson)
			.then((p) => {
				setChangeMessage(`Successfully create ${newName}`);
				setPersons(persons.concat(p));
				setNewName("");
				setNewNumber("");
				setTimeout(() => {
					setChangeMessage(null);
				}, 2000);
			})
			.catch((err) => {
				setIsError(true);
				setChangeMessage(err.response.data.error);
				setTimeout(() => {
					setChangeMessage(null);
					setIsError(false);
				}, 2000);
			});
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
			<h1>Phonebook</h1>
			{changeMessage ? (
				<div className="msg" style={{ color: isError ? "red" : "green" }}>
					{changeMessage}{" "}
				</div>
			) : null}
			<Filter
				text="filter shown with"
				value={newFilter}
				handleNewChange={handleFilterChange}
			/>
			<h2>add a new </h2>

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
