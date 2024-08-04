import { createSlice } from "@reduxjs/toolkit";

const notificationReducer = createSlice({
	name: "notification",
	initialState: null,
	reducers: {
		showNotification(state, action) {
			return action.payload;
		},
		clearNotification(state, action) {
			return null;
		},
	},
});

export const { showNotification, clearNotification } =
	notificationReducer.actions;
export const setNotification = (content, time) => {
	return (dispatch) => {
		dispatch(showNotification(content));
		setTimeout(() => {
			dispatch(clearNotification());
		}, time * 1000);
	};
};

export default notificationReducer.reducer;
