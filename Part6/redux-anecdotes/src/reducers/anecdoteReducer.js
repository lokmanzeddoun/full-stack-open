import { createSlice } from "@reduxjs/toolkit";

const anecdoteReducer = createSlice({
	name: "anecdote",
	initialState: [],
	reducers: {
		createAnecdote(state, action) {
			state.push(action.payload);
		},
		addVote(state, action) {
			const id = action.payload;
			const changedAnecdotes = state.find((n) => n.id === id);
			const anecdoteAfterChange = {
				...changedAnecdotes,
				votes: changedAnecdotes.votes + 1,
			};
			return state.map((n) => (n.id === id ? anecdoteAfterChange : n));
		},
		setAnecdotes(state, action) {
			return action.payload;
		},
	},
});

export default anecdoteReducer.reducer;
export const { addVote, createAnecdote, appendAnecdote, setAnecdotes } =
	anecdoteReducer.actions;
