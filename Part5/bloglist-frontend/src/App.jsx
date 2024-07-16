import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import login from "./services/login";
import Notification from "./components/Notification";
const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [Message, setMessage] = useState(null);
	const [isError, setIsError] = useState(null);
	const [user, setUser] = useState(null);
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");
	const [likes, setLikes] = useState("");
	useEffect(() => {
		const loggedUser = window.localStorage.getItem("loggedUser");
		if (loggedUser) {
			const user = JSON.parse(loggedUser);
			setUser(user);
			blogService.setToken(user.token);
		}
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);
	const handleLogin = async (e) => {
		e.preventDefault();
		console.log("logging in with ", username, password);
		try {
			const res = await login({ username, password });
			window.localStorage.setItem("loggedUser", JSON.stringify(res));
			blogService.setToken(user.token);
			setUser(res);
			setUsername("");
			setPassword("");
		} catch (error) {
			setMessage("Wrong username or password");
			setIsError(true);
			setTimeout(() => {
				setMessage(null);
				setIsError(null);
			}, 5000);
		}
	};
	const addBlog = async (e) => {
		e.preventDefault();
		if (!user) {
			setMessage(`You are not allowed to perform this action`);
			setIsError(true);
			setTimeout(() => {
				setMessage(null);
				setIsError(null);
			}, 5000);
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
		} catch (error) {
			setMessage(`You are not allowed to perform this action`);
			setIsError(true);
			setTimeout(() => {
				setMessage(null);
				setIsError(null);
			}, 5000);
		}
	};
	const handleLogOut = () => {
		window.localStorage.clear();
		setUser(null);
		setTimeout(() => {
			setMessage(null);
			setIsError(null);
		}, 5000);
	};
	const loginForm = () => {
		return (
			<div>
				<h2>Log in into Application</h2>
				<form onSubmit={handleLogin}>
					<div>
						Username{" "}
						<input
							type="text"
							value={username}
							name="username"
							onChange={(e) => {
								setUsername(e.target.value);
							}}
						/>
					</div>
					<div>
						Password{" "}
						<input
							type="text"
							value={password}
							name="password"
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
					</div>
					<button type="submit">Login</button>
				</form>
			</div>
		);
	};
	return (
		<div>
			<h2>blogs</h2>
			<Notification message={Message} error={isError} />
			{user === null ? (
				loginForm()
			) : (
				<div>
					<p>{user.name} Logged-in</p>
					<button type="submit" onClick={handleLogOut}>
						Log Out
					</button>
				</div>
			)}
			<div>
				<h2>Create blog</h2>
				<form onSubmit={addBlog}>
					<div>
						Title:
						<input
							type="text"
							name="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div>
						Author:
						<input
							type="text"
							name="author"
							value={author}
							onChange={(e) => setAuthor(e.target.value)}
						/>
					</div>
					<div>
						URL:
						<input
							type="text"
							name="url"
							value={url}
							onChange={(e) => setUrl(e.target.value)}
						/>
					</div>
					<div>
						Likes:
						<input
							type="text"
							name="likes"
							value={likes}
							onChange={(e) => setLikes(e.target.value)}
						/>
					</div>
					<button type="submit">Create</button>
				</form>
			</div>

			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);
};

export default App;
