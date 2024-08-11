import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, BookDetails } from "../queries";
import { updateCache } from "../App";
const ADD_NEW_BOOK = gql`
	mutation addBook(
		$title: String!
		$author: String!
		$published: Int!
		$genres: [String!]
	) {
		addBook(
			title: $title
			author: $author
			published: $published
			genres: $genres
		) {
			...BookDetails
		}
	}
	${BookDetails}
`;
const NewBook = () => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [published, setPublished] = useState("");
	const [genre, setGenre] = useState("");
	const [genres, setGenres] = useState([]);
	const [addBook] = useMutation(ADD_NEW_BOOK, {
		refetchQueries: [{ query: ALL_AUTHORS }],
		onError: (error) => {
			console.log("error", error.graphQLErrors[0].message);
		},
		update: (cache, response) => {
			updateCache(cache, { query: ALL_BOOKS }, response.data.addBook);
		},
	});
	const submit = async (event) => {
		const publishedNum = +published;
		event.preventDefault();
		addBook({ variables: { title, author, published: publishedNum, genres } });
		setTitle("");
		setPublished("");
		setAuthor("");
		setGenres([]);
		setGenre("");
	};

	const addGenre = () => {
		setGenres(genres.concat(genre));
		setGenre("");
	};

	return (
		<div>
			<form onSubmit={submit}>
				<div>
					title
					<input
						value={title}
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author
					<input
						value={author}
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					published
					<input
						type="number"
						value={published}
						onChange={({ target }) => setPublished(target.value)}
					/>
				</div>
				<div>
					<input
						value={genre}
						onChange={({ target }) => setGenre(target.value)}
					/>
					<button onClick={addGenre} type="button">
						add genre
					</button>
				</div>
				<div>genres: {genres.join(" ")}</div>
				<button type="submit">create book</button>
			</form>
		</div>
	);
};

export default NewBook;
