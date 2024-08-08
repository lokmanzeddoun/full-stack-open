import { gql, useQuery } from "@apollo/client";
const ALL_BOOKS = gql`
	query {
		allBooks {
			author
			title
			published
		}
	}
`;
const Books = () => {
	const result = useQuery(ALL_BOOKS);
	if (result.loading) {
		return <div>is Loading ....</div>;
	}
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
					{result.data.allBooks.map((a) => (
						<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author}</td>
							<td>{a.published}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Books;
