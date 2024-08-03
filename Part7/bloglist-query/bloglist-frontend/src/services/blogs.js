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
const update = async (id, newObject) => {
	const res = await axios.put(`${baseUrl}/${id}`, newObject);
	return res.data;
};

const remove = async (id) => {
	const config = {
		headers: { Authorization: token },
	};

	const res = await axios.delete(`${baseUrl}/${id}`, config);
	return res.data;
};
export default { getAll, create, setToken,remove,update };
