import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notificationReducer";
import errorReducer from "./errorReducer";
import blogReducer from "./blogReducer";
import authReducer from "./authReducer";
import usersReducer from "./userReducer";
import commentReducer from "./comment";
const store = configureStore({
	reducer: {
		notification: notificationReducer,
		error: errorReducer,
		blogs: blogReducer,
		user: authReducer,
		users: usersReducer,
		comment: commentReducer,
	},
});
export default store;
