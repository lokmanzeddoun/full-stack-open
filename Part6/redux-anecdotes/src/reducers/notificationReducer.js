import { createSlice } from "@reduxjs/toolkit";

const notificationReducer = createSlice({
	name: "notification",
	initialState: "",
	reducers: {
		showNotification(state, action) {
			return action.payload;
		},
	},
});

export default notificationReducer.reducer;
export const { showNotification } = notificationReducer.actions;
