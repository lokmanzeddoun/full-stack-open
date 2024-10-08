import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const commentSlice = createSlice({
	name: "comment",
	initialState: [],
	reducers: {
		setComment(state, action) {
			return action.payload;
		},
		appendComment(state, action) {
			return [...state, action.payload];
		},
	},
});

export const { setComment, appendComment } = commentSlice.actions;

export const initializeAllComments = (id) => {
	return async (dispatch) => {
		const comments = await blogService.getComment(id);
		dispatch(setComment(comments));
	};
};

export const createComments = (id, content) => {
	return async (dispatch) => {
		const newComment = await blogService.postComment(id, content);
		dispatch(appendComment(newComment));
	};
};

export default commentSlice.reducer;
