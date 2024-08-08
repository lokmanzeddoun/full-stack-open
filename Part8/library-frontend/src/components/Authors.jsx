import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS, UPDATE_BORN } from "../queries";
import Select from "react-select";
const Authors = () => {
	const [born, setBorn] = useState("");
	const result = useQuery(ALL_AUTHORS);
	const [editAuthor] = useMutation(UPDATE_BORN, {
		refetchQueries: [{ query: ALL_AUTHORS }],
	});
	if (result.loading) {
		return <div>Loading ....</div>;
	}

	const authors = result.data.allAuthors.map((a) => {
		return { label: a.name, value: a.name };
	});
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
					const name = e.target.authors.value;
					const bornYear = +born;
					editAuthor({ variables: { name, bornYear } });
					setBorn("");
				}}
			>
				<Select
					className="basic-single"
					classNamePrefix={"select"}
					name="authors"
					defaultValue={authors[0]}
					options={authors}
				/>
				<div>
					born :
					<input
						type="text"
						value={born}
						onChange={(e) => {
							setBorn(e.target.value);
						}}
					/>
				</div>
				<button type="submit">update author</button>
			</form>
		</div>
	);
};

export default Authors;
