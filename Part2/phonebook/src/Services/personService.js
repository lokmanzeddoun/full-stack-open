import axios from "axios";
const baseUrl = `/api/persons`;

const getAllPersons = () =>
	axios.get(baseUrl).then((response) => response.data);
const createPerson = (newObject) =>
	axios.post(baseUrl, newObject).then((response) => response.data);
const updatePerson = (id, newObj) =>
	axios.put(`${baseUrl}/${id}`, newObj).then((response) => response.data);
const deletePerson = (id) => {
	console.log(id);
	return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};
const personServices = {
	getAllPersons,
	createPerson,
	updatePerson,
	deletePerson,
};

export default personServices;
