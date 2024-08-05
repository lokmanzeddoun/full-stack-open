import { useEffect } from "react";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import AddBlogForm from "./components/AddBlogForm";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser, logout } from "./reducers/authReducer";
import { initializeUsers } from "./reducers/userReducer";
import BlogList from "./components/BlogList";
import UserDisplay from "./components/UserDisplay";
import { Routes, Route, Link } from "react-router-dom";
import User from "./components/User";
import BlogDisplay from "./components/BlogDisplay";
const App = () => {
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
	const Home = () => (
		<div>
			<h2>Blog app</h2>
			<AddBlogForm />
			<BlogList />
		</div>
	);
	const Blogs = () => (
		<div>
			<h2>blogs</h2>
			<BlogList />
		</div>
	);
	return (
		<div>
			<h2>blogs</h2>
			<nav>
				<Link to={"/"}>Home </Link>
				<Link to={"/blogs"}>Blogs </Link>
				<Link to={"/users"}>users </Link>
				{authUser !== null ? (
					<div>
						<em> {authUser.name} logged in </em>
						<button type="submit" onClick={handleLogout}>
							Log Out
						</button>
					</div>
				) : (
					<Link to={"/login"}>login</Link>
				)}
			</nav>
			<Notification />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={authUser ? <Home /> : <LoginForm />} />
				<Route path="/users" element={<UserDisplay />} />
				<Route path="/users/:id" element={<User />} />
				<Route path="/blogs" element={<Blogs />} />
				<Route path="/blogs/:id" element={<BlogDisplay />} />
			</Routes>
		</div>
	);
};

export default App;
