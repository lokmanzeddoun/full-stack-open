import { useEffect, useRef } from "react";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import AddBlogForm from "./components/AddBlogForm";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser, logout } from "./reducers/authReducer";
import { initializeUsers } from "./reducers/userReducer";
import BlogList from "./components/BlogList";
import UserDisplay from "./components/UserDisplay";
const App = () => {
	const blogRef = useRef();
	const dispatch = useDispatch();
	const authUser = useSelector((state) => state.user);
	useEffect(() => {
		dispatch(initializeBlogs());
		dispatch(initializeUser());
		dispatch(initializeUsers());
	}, [dispatch]);
	const handleLogout = async (event) => {
		event.preventDefault();
		dispatch(logout());
	};
	return (
		<div>
			<h2>blogs</h2>
			<Notification />
			{authUser === null ? (
				<LoginForm />
			) : (
				<div>
					<p>{authUser.name} Logged-in</p>
					<UserDisplay />
					<button type="submit" onClick={handleLogout}>
						Log Out
					</button>
					<Togglable buttonLabel="create" ref={blogRef}>
						<AddBlogForm />
					</Togglable>
					<BlogList />
				</div>
			)}
		</div>
	);
};

export default App;
