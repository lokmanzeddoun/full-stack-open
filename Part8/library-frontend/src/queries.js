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
			author
			title
			published
		}
	}
`;
