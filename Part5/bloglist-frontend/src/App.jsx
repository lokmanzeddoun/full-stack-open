import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import login from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import AddBlogForm from "./components/AddBlogForm";
const App = () => {
	const blogRef = useRef();
	const [blogs, setBlogs] = useState([]);

	const [Message, setMessage] = useState(null);
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
			setMessage(`logged in ${res.name}`);
			setTimeout(() => {
				setMessage(null);
			}, 2000);
		} catch (error) {
			setMessage("Wrong username or password");
			setIsError(true);
			setTimeout(() => {
				setMessage(null);
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
			setMessage("Unauthorized Operation");
			setIsError(true);
			setTimeout(() => {
				setMessage(null);
				setIsError(null);
			}, 2000);
		}
		setRefreshBlog(!refreshBlog);
	};
	const addBlog = async (blogObject) => {
		blogRef.current.toggleVisibility();
		if (!user) {
			setMessage(`You are not allowed to perform this action`);
			setIsError(true);
			setTimeout(() => {
				setMessage(null);
				setIsError(null);
			}, 2000);
			return;
		}
		try {
			const res = await blogService.create(blogObject);
			setBlogs(blogs.concat(res));
			setMessage(`a new  blog ${res.title} added by ${res.author}`);
			setRefreshBlog(!refreshBlog);
		} catch (error) {
			setMessage(`You are not allowed to perform this action`);
			setIsError(true);
			setTimeout(() => {
				setMessage(null);
				setIsError(null);
			}, 2000);
		}
	};
	const handleLogOut = () => {
		window.localStorage.clear();
		setUser(null);
		setTimeout(() => {
			setMessage(null);
			setIsError(null);
		}, 2000);
	};
	return (
		<div>
			<h2>blogs</h2>
			<Notification message={Message} error={isError} />
			{user === null ? (
				<LoginForm handleLogin={handleLogin} />
			) : (
				<div>
					<p>{user.name} Logged-in</p>
					<button type="submit" onClick={handleLogOut}>
						Log Out
					</button>
				</div>
			)}
			<Togglable buttonLabel="create" ref={blogRef}>
				<AddBlogForm createBlog={addBlog} />
			</Togglable>
			{blogs.map((blog) => (
				<Blog
					key={blog.id}
					blog={blog}
					addLikes={addLikes}
					deleteBlog={deleteBlog}
				/>
			))}
		</div>
	);
};

export default App;
