/* eslint-disable react/prop-types */
import { useState } from "react";
const Books = ({ result }) => {
	const [filter, setFilter] = useState("all genres");
	if (result.loading) {
		return <div>is Loading ....</div>;
	}

	const genreDuplicateArray = result.data.allBooks.map((b) => b.genres).flat();

	const genres = [...new Set(genreDuplicateArray)];

	genres.push("all genres");
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
