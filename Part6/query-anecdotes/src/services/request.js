import axios from "axios";

export const getAnecdotes = () =>
	axios.get("http://localhost:3001/anecdotes").then((res) => res.data);

export const createAnecdote = (data) => {
	axios.post("http://localhost:3001/anecdotes", data).then((res) => res.data);
};
