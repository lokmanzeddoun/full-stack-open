import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;

const setToken = (newToken) => {
	token = `Bearer ${newToken}`;
};
const getAll = async () => {
	const request = axios.get(baseUrl);
	return request.then((res) => res.data);
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
export default { getAll, create, setToken, remove, update };
