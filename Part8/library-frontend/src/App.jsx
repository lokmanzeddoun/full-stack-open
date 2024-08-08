import Authors from "./components/Authors";
import Books from "./components/Books";
import Home from "./components/Home";
import NewBook from "./components/NewBook";
import { Routes, Route, Link } from "react-router-dom";
const App = () => {
	const padding = {
		padding: 5,
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
				<Link to={"/newBook"} style={padding}>
					add book
				</Link>
			</div>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/authors" element={<Authors />} />
				<Route path="/books" element={<Books />} />
				<Route path="/newBook" element={<NewBook />} />
			</Routes>
		</div>
	);
};

export default App;
