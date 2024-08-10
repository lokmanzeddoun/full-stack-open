import { gql } from "@apollo/client";

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
			author {
				name
			}
			title
			published
			genres
		}
	}
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
