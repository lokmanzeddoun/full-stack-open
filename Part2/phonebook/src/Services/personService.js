import axios from "axios";
const baseUrl = `http://localhost:3001/persons`;

const getAllPersons = () =>
	axios.get(baseUrl).then((response) => response.data);
const createPerson = (newObject) =>
	axios.post(baseUrl, newObject).then((response) => response.data);
const updatePerson = (id, newObj) =>
	axios.put(`${baseUrl}/${id}`, newObj).then((response) => response.data);
const deletePerson = (id) =>
	axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
const personServices = {
	getAllPersons,
	createPerson,
	updatePerson,
	deletePerson,
};

export default personServices;
