import { createSlice } from "@reduxjs/toolkit";

const errorReducer = createSlice({
	name: "error",
	initialState: false,
	reducers: {
		setError() {
			return true;
		},
		clearError() {
			return false;
		},
	},
});

export const { setError, clearError } = errorReducer.actions;

export const setIsError = (time) => {
	return (dispatch) => {
		dispatch(setError());
		setTimeout(() => {
			dispatch(clearError());
		}, time * 1000);
	};
};
export default errorReducer.reducer;
