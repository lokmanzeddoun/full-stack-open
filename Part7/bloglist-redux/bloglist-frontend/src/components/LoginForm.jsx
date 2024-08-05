import { useState } from "react";
import { useDispatch } from "react-redux";
import { Login } from "../reducers/authReducer";
import { initializeBlogs } from "../reducers/blogReducer";
import { Button, Form } from "react-bootstrap";
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
			<Form onSubmit={handleLogin}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Username</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter username"
						value={username}
						name="username"
						data-testid="username"
						onChange={(e) => {
							setUsername(e.target.value);
						}}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						name="password"
						data-testid="password"
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Login
				</Button>
			</Form>
		</div>
	);
};

export default LoginForm;
