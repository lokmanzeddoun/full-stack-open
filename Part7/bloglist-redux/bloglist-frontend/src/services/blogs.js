import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;

const setToken = (newToken) => {
	token = `Bearer ${newToken}`;
};
const getAll = async () => {
	const res = await axios.get(baseUrl);
	return res.data;
};
const create = async (data) => {
	const config = {
		headers: { Authorization: token },
	};
	const res = await axios.post(baseUrl, data, config);
	return res.data;
};
const update = async (newObject) => {
	const obj = {
		title: newObject.title,
		author: newObject.author,
		likes: newObject.likes,
		url: newObject.url,
	};
	const res = await axios.put(`${baseUrl}/${newObject.id}`, obj);
	return res.data;
};

const remove = async (id) => {
	const config = {
		headers: { Authorization: token },
	};

	const res = await axios.delete(`${baseUrl}/${id}`, config);
	return res.data;
};
const getComment = async (id) => {
	const response = await axios.get(`${baseUrl}/${id}/comments`);
	return response.data;
};

const getId = () => (100000 * Math.random()).toFixed(0);

const postComment = async (id, content) => {
	const object = { content, id: getId() };
	const response = await axios.post(`${baseUrl}/${id}/comments`, object);
	return response.data;
};
export default {
	getAll,
	create,
	setToken,
	remove,
	update,
	getComment,
	postComment,
};
