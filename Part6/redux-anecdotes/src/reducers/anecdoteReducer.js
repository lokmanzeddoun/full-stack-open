import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";
const anecdoteReducer = createSlice({
	name: "anecdote",
	initialState: [],
	reducers: {
		createAnecdote(state, action) {
			state.push(action.payload);
		},
		addVote(state, action) {
			const id = action.payload.id;
			const anecdoteAfterChange = action.payload;
			return state.map((n) => (n.id === id ? anecdoteAfterChange : n));
		},
		setAnecdotes(state, action) {
			return action.payload;
		},
	},
});
export const { addVote, createAnecdote, setAnecdotes } =
	anecdoteReducer.actions;

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll();
		dispatch(setAnecdotes(anecdotes));
	};
};
export const createAnecdotes = (content) => {
	return async (dispatch) => {
		const newAnecdote = await anecdoteService.createNew(content);
		dispatch(createAnecdote(newAnecdote));
	};
};
export const addVotes = (id) => {
	return async (dispatch) => {
		const newVote = await anecdoteService.updateVote(id);
		dispatch(addVote(newVote));
	};
};
export default anecdoteReducer.reducer;
