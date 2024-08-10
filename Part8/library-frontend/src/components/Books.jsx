/* eslint-disable react/prop-types */
import { useState } from "react";
const Books = ({ result }) => {
	const [filter, setFilter] = useState("all genres");
	const genres = [
		"refactoring",
		"agile",
		"patterns",
		"design",
		"crime",
		"classic",
		"all genres",
	];
	if (result.loading) {
		return <div>is Loading ....</div>;
	}
	const filteredBook = result.data.allBooks.filter((book) =>
		filter === "all genres" ? book : book.genres.includes(filter)
	);
	return (
		<div>
			<h2>books</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{filteredBook.map((a) => (
						<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td>{a.published}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div>
				{genres.map((g, index) => (
					<button key={index} onClick={() => setFilter(g)}>
						{g}
					</button>
				))}
			</div>
		</div>
	);
};

export default Books;
