import Authors from "./components/Authors";
import Books from "./components/Books";
import Home from "./components/Home";
import NewBook from "./components/NewBook";
import { Routes, Route, Link } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import { useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";
import Notification from "./components/Notification";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS, USER } from "./queries";
import Recommendation from "./components/Recomandation";
const App = () => {
	useEffect(() => {
		let freshToken = localStorage.getItem("library-user-token");
		if (freshToken) {
			setToken(freshToken);
		}
	}, []);
	const books = useQuery(ALL_BOOKS);
	const user = useQuery(USER);
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
						<Link to={"/recommend"} style={padding}>
							recommend
						</Link>
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
				<Route path="/books" element={<Books result={books} />} />
				<Route path="/newBook" element={<NewBook />} />
				<Route
					path="/recommend"
					element={<Recommendation result={books} user={user} />}
				/>
			</Routes>
		</div>
	);
};

export default App;
