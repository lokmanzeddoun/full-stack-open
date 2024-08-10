import Authors from "./components/Authors";
import Books from "./components/Books";
import Home from "./components/Home";
import NewBook from "./components/NewBook";
import { Routes, Route, Link } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import { useApolloClient } from "@apollo/client";
import { useState } from "react";
import Notification from "./components/Notification";
const App = () => {
	const [token, setToken] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
	const client = useApolloClient();
	const padding = {
		padding: 5,
	};

	const logout = () => {
		setToken(null);
		localStorage.clear();
		client.resetStore();
	};

	return (
		<div>
			<div>
				<Link to={"/authors"} style={padding}>
					authors
				</Link>
				<Link to={"/books"} style={padding}>
					books
				</Link>
				{!token ? (
					<Link to={"/login"}>login</Link>
				) : (
					<>
						<Link to={"/newBook"} style={padding}>
							add book
						</Link>
						<button onClick={logout}>Log out</button>
					</>
				)}
			</div>
			<Notification error={errorMessage} />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/login"
					element={<LoginForm setToken={setToken} setError={setErrorMessage} />}
				/>
				<Route path="/authors" element={<Authors />} />
				<Route path="/books" element={<Books />} />
				<Route path="/newBook" element={<NewBook />} />
			</Routes>
		</div>
	);
};

export default App;
