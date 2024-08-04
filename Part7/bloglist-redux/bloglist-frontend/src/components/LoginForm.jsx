import { useState } from "react";
import { useDispatch } from "react-redux";
import { Login } from "../reducers/authReducer";
import { initializeBlogs } from "../reducers/blogReducer";
const LoginForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();

	const handleLogin = async (event) => {
		event.preventDefault();
		dispatch(Login(username, password));
		dispatch(initializeBlogs());
		setPassword("");
		setUsername("");
	};

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
						data-testid="username"
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
						data-testid="password"
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

export default LoginForm;
