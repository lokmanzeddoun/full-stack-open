import React from "react";

const LoginForm = ({
	username,
	password,
	handleUsernameChange,
	handlePasswordChange,
	handleSubmit,
}) => {
	return (
		<div>
			<h2>Log in into Application</h2>
			<form onSubmit={handleSubmit}>
				<div>
					Username{" "}
					<input
						type="text"
						value={username}
						name="username"
						onChange={handleUsernameChange}
					/>
				</div>
				<div>
					Password{" "}
					<input
						type="text"
						value={password}
						name="password"
						onChange={handlePasswordChange}
					/>
				</div>
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default LoginForm;
