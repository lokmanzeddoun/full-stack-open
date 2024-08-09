const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
const mongoose = require("mongoose");
const Book = require("./models/book");
const Author = require("./models/author");
const { GraphQLError } = require("graphql");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log("connected to MongoDB");
	})
	.catch((error) => {
		console.log("error connection to MongoDB:", error.message);
	});

const typeDefs = `
  type Book {
  title:String!
  published:Int!
  author:Author!
  id:ID!
  genres:[String!]!
  }
  type Author {
  name:String!
  id:ID!
  born:Int
  bookCount:Int!
  }
  type Query {
    bookCount: Int!
    authorCount:Int!
    allBooks(author:String,genre:String):[Book!]!
    allAuthors:[Author!]!
  }
  type Mutation {
  addBook(
  title:String!
  author:String!
  published:Int!
  genres:[String!]
  ):Book
  editAuthor(
  name:String!
  setBornTo:Int!
  ):Author
  }
`;

const resolvers = {
	Query: {
		bookCount: async () => Book.collection.countDocuments(),
		authorCount: () => Author.collection.countDocuments(),
		allBooks: async (root, args) => {
			let filteredBook = await Book.find({}).populate("author");
			if (args.author) {
				filteredBook = filteredBook.filter(
					(a) => a.author.name === args.author
				);
			}
			if (args.genre) {
				filteredBook = filteredBook.filter((a) =>
					a.genres.includes(args.genre)
				);
			}
			return filteredBook;
		},
		allAuthors: async () => Author.find(),
	},
	Author: {
		bookCount: async (root) => {
			const author = await Author.find({ name: root.name });
			return Book.find({ author: author }).countDocuments();
		},
	},
	Mutation: {
		addBook: async (root, args) => {
			let author = await Author.findOne({ name: args.author });
			if (!author) {
				const newAuthor = new Author({ name: args.author });
				try {
					author = await newAuthor.save();
				} catch (error) {
					throw new GraphQLError(`name must be at least 4 `, {
						extension: {
							code: "BAD_USER_INPUT",
							invalidArgs: args.author,
							error,
						},
					});
				}
			}
			const book = new Book({ ...args, author: author._id });
			try {
				await book.save();
			} catch (error) {
				throw new GraphQLError(`title must be at least 5 and unique`, {
					extensions: {
						code: "BAD_USER_INPUT",
						invalidArgs: args.title,
						error,
					},
				});
			}
			book.populate("author");
			return book;
		},
		editAuthor: async (root, args) => {
			const author = await Author.findOne({ name: args.name });
			if (!author) return null;
			author.born = args.setBornTo;
			return author.save();
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

startStandaloneServer(server, {
	listen: { port: 4000 },
}).then(({ url }) => {
	console.log(`Server ready at ${url}`);
});
