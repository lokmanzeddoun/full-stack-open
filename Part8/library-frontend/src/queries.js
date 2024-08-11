import { gql } from "@apollo/client";
export const BookDetails = gql`
	fragment BookDetails on Book {
		title
		published
		author {
			name
			born
			bookCount
			id
		}
		id
		genres
	}
`;
export const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			born
			bookCount
		}
	}
`;
export const UPDATE_BORN = gql`
	mutation ($name: String!, $bornYear: Int!) {
		editAuthor(name: $name, setBornTo: $bornYear) {
			name
			born
		}
	}
`;

export const ALL_BOOKS = gql`
	query {
		allBooks {
			...BookDetails
		}
	}
	${BookDetails}
`;

export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`;

export const USER = gql`
	query {
		me {
			username
			favoriteGenre
		}
	}
`;

export const BOOK_ADDED = gql`
	subscription {
		bookAdded {
			...BookDetails
		}
	}
	${BookDetails}
`;
