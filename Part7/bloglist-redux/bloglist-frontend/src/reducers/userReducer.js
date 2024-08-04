import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "../services/usesrs";

const usersSlice = createSlice({
	name: `users`,
	initialState: [],
	reducers: {
		setUsers(state, action) {
			return action.payload;
		},
	},
});

const { setUsers } = usersSlice.actions;
export const initializeUsers = () => {
	return async (dispatch) => {
		const users = await getAllUsers();
		dispatch(setUsers(users));
	};
};
export default usersSlice.reducer;
