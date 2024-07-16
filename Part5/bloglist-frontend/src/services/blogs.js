import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;

const setToken = (newToken) => {
	token = `Bearer ${newToken}`;
};
const getAll = async () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};
const create = async (data) => {
	const config = {
		headers: { Authorization: token },
	};
	const res = await axios.post(baseUrl, data, config);
	return res.data;
};
export default { getAll, create, setToken };
