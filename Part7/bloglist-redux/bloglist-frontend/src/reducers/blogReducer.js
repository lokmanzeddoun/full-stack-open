import { createSlice } from "@reduxjs/toolkit";
import blogs from "../services/blogs";
const blogReducer = createSlice({
	name: `blog`,
	initialState: [],
	reducers: {
		setBlogs(state, action) {
			return action.payload;
		},
		voteBlog(state, action) {
			const id = action.payload.id;
			const blogToChange = action.payload;
			return state.map((blog) => (blog.id === id ? blogToChange : blog));
		},
		appendBlog(state, action) {
			return [...state, action.payload];
		},
		deleteBlog(state, action) {
			return state.filter((blog) => blog.id !== action.payload.id);
		},
	},
});

export const { setBlogs, voteBlog, deleteBlog, appendBlog } =
	blogReducer.actions;

export const initializeBlogs = () => {
	return async (dispatch) => {
		const result = await blogs.getAll();
		dispatch(setBlogs(result));
	};
};
export const removeBlog = (id) => {
	return async (dispatch) => {
		await blogs.remove(id);
		dispatch(deleteBlog(id));
	};
};

export const likeBlog = (blog) => {
	return async (dispatch) => {
		const res = await blogs.update({ ...blog, likes: blog.likes + 1 });
		dispatch(voteBlog(res));
	};
};

export const createBlog = (blog) => {
	return async (dispatch) => {
		const res = await blogs.create(blog);
		dispatch(appendBlog(res));
	};
};
export default blogReducer.reducer;
