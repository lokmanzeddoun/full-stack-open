import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import login from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import AddBlogForm from "./components/AddBlogForm";
import { useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
const App = () => {
	const blogRef = useRef();
	const dispatch = useDispatch();
	const [blogs, setBlogs] = useState([]);

	const [isError, setIsError] = useState(null);
	const [user, setUser] = useState(null);
	const [refreshBlog, setRefreshBlog] = useState(false);

	useEffect(() => {
		const loggedUser = window.localStorage.getItem("loggedUser");
		if (loggedUser) {
			const user = JSON.parse(loggedUser);
			setUser(user);
			blogService.setToken(user.token);
		}
		blogService.getAll().then((blogs) => {
			blogs.sort((a, b) => b.likes - a.likes);
			setBlogs(blogs);
		});
	}, [refreshBlog]);
	const handleLogin = async (username, password) => {
		try {
			const res = await login({ username, password });
			setUser(res);
			window.localStorage.setItem("loggedUser", JSON.stringify(res));
			blogService.setToken(res.token);
			dispatch(setNotification(`logged in ${res.name}`, 2));
		} catch (error) {
			dispatch(setNotification("Wrong username or password", 2));
			setIsError(true);
			setTimeout(() => {
				setIsError(null);
			}, 2000);
		}
	};
	const addLikes = async (id, blogObject) => {
		await blogService.update(id, blogObject);
		setRefreshBlog(!refreshBlog);
	};

	const deleteBlog = async (id) => {
		try {
			await blogService.remove(id);
		} catch (error) {
			dispatch(setNotification("Unauthorized Operation", 2));
			setIsError(true);
			setTimeout(() => {
				setIsError(null);
			}, 2000);
		}
		setRefreshBlog(!refreshBlog);
	};
	const addBlog = async (blogObject) => {
		blogRef.current.toggleVisibility();
		if (!user) {
			dispatch(
				setNotification(`You are not allowed to perform this action`, 2),
			);
			setIsError(true);
			setTimeout(() => {
				setIsError(null);
			}, 2000);
			return;
		}
		try {
			const res = await blogService.create(blogObject);
			setBlogs(blogs.concat(res));
			dispatch(
				setNotification(`a new  blog ${res.title} added by ${res.author}`, 2),
			);
			setRefreshBlog(!refreshBlog);
		} catch (error) {
			dispatch(
				setNotification(`You are not allowed to perform this action`, 2),
			);
			setIsError(true);
			setTimeout(() => {
				setIsError(null);
			}, 2000);
		}
	};
	const handleLogOut = () => {
		window.localStorage.clear();
		setUser(null);
		setTimeout(() => {
			setIsError(null);
		}, 2000);
	};
	return (
		<div>
			<h2>blogs</h2>
			<Notification error={isError} />
			{user === null ? (
				<LoginForm handleLogin={handleLogin} />
			) : (
				<div>
					<p>{user.name} Logged-in</p>
					<button type="submit" onClick={handleLogOut}>
						Log Out
					</button>
					<Togglable buttonLabel="create" ref={blogRef}>
						<AddBlogForm createBlog={addBlog} />
					</Togglable>

					{blogs.map((blog) => (
						<Blog
							key={blog.id}
							blog={blog}
							addLikes={addLikes}
							deleteBlog={deleteBlog}
							username={user.username}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default App;
