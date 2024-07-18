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
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
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
	const handleLogin = async (e) => {
		e.preventDefault();
		console.log("logging in with ", username, password);
		try {
			const res = await login({ username, password });
			setUser(res);
			setUsername("");
			setPassword("");
			window.localStorage.setItem("loggedUser", JSON.stringify(res));
			blogService.setToken(res.token);
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
	const addBlog = async (e) => {
		blogRef.current.toggleVisibility();
		e.preventDefault();
		if (!user) {
			setMessage(`You are not allowed to perform this action`);
			setIsError(true);
			setTimeout(() => {
				setMessage(null);
				setIsError(null);
			}, 2000);
			return;
		}
		const data = {
			title,
			author,
			url,
			user: user.name,
			likes,
		};
		try {
			const res = await blogService.create(data);
			setBlogs(blogs.concat(res));
			setMessage(`a new  blog ${res.title} added by ${res.author} `);
			setRefreshBlog(!refreshBlog);
			setTimeout(() => {
				setMessage(null);
			}, 2000);
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
				<Togglable buttonLabel={`login`}>
					<LoginForm
						username={username}
						password={password}
						handleUsernameChange={({ target }) => setUsername(target.value)}
						handlePasswordChange={({ target }) => setPassword(target.value)}
						handleSubmit={handleLogin}
					/>
				</Togglable>
			) : (
				<div>
					<p>{user.name} Logged-in</p>
					<button type="submit" onClick={handleLogOut}>
						Log Out
					</button>
				</div>
			)}
			<Togglable buttonLabel="create" ref={blogRef}>
				<AddBlogForm handleSubmit={addBlog} />
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
