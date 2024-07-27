import axios from "axios";

export const getAnecdotes = () =>
	axios.get("http://localhost:3001/anecdotes").then((res) => res.data);

export const createAnecdote = (data) => {
	return axios.post("http://localhost:3001/anecdotes", data).then((res) => res.data);
};

export const updateVote = (updateAnecdote) => {
	return axios
		.put(`http://localhost:3001/anecdotes/${updateAnecdote.id}`, updateAnecdote)
		.then((res) => res.data);
};
