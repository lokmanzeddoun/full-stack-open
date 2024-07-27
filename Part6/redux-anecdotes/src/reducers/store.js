import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "./anecdoteReducer";
import filterReducer from "./filterReducer";
const store = configureStore({
	reducer: {
		notes: anecdoteReducer,
		filter: filterReducer,
	},
});

export default store;
