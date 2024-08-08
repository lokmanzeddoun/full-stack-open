import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS, UPDATE_BORN } from "../queries";
const Authors = () => {
	const [name, setName] = useState("");
	const [born, setBorn] = useState("");
	const result = useQuery(ALL_AUTHORS);
	const [editAuthor] = useMutation(UPDATE_BORN, {
		refetchQueries: [{ query: ALL_AUTHORS }],
	});
	if (result.loading) {
		return <div>Loading ....</div>;
	}
	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{result.data.allAuthors.map((a) => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>
			<h3> Set birthday</h3>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					const bornYear = +born;
					editAuthor({ variables: { name, bornYear } });
					setBorn("");
					setName("");
				}}
			>
				<div>
					name :
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div>
					born :
					<input
						type="text"
						value={born}
						onChange={(e) => setBorn(e.target.value)}
					/>
				</div>
				<button type="submit">update author</button>
			</form>
		</div>
	);
};

export default Authors;
