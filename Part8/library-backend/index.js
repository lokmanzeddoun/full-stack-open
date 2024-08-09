const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
const mongoose = require("mongoose");
const Book = require("./models/book");
const Author = require("./models/author");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
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
type User{
username:String!
favoriteGenre:String!
id:ID!
}
type Token{
value:String!}

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
		me:User!
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
	createUser(
    username: String!
    favoriteGenre: String!
		): User
		login(
			username: String!
			password: String!
			): Token
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
		me: (root, args, context) => context.currentUser,
	},
	Author: {
		bookCount: async (root) => {
			const author = await Author.find({ name: root.name });
			return Book.find({ author: author }).countDocuments();
		},
	},
	Mutation: {
		addBook: async (root, args, context) => {
			const currentUser = context.currentUser;

			if (!currentUser) {
				throw new GraphQLError("not authenticated", {
					extensions: {
						code: "BAD_USER_INPUT",
					},
				});
			}
			let author = await Author.findOne({ name: args.author });
			if (!author) {
				const newAuthor = new Author({ name: args.author, born: null });
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
			console.log("🚀 ~ addBook: ~ author:", author);
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
			return book.populate("author");
		},
		editAuthor: async (root, args, context) => {
			const currentUser = context.currentUser;

			if (!currentUser) {
				throw new GraphQLError("not authenticated", {
					extensions: {
						code: "BAD_USER_INPUT",
					},
				});
			}
			const author = await Author.findOne({ name: args.name });
			if (!author) return null;
			author.born = args.setBornTo;
			return author.save();
		},
		createUser: async (root, args) => {
			const user = new User({
				username: args.username,
				favoriteGenre: args.favoriteGenre,
			});
			return user.save().catch((error) => {
				throw new GraphQLError(
					"the username must be unique and at least 3 character",
					{
						extension: {
							code: "BAD_USER_INPUT",
							invalidArgs: args.username,
							error,
						},
					}
				);
			});
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username });
			if (!user || args.password !== "password") {
				throw new GraphQLError(`wrong credential`, {
					extensions: {
						code: "BAD_USER_INPUT",
					},
				});
			}
			const userToken = {
				username: args.username,
				id: user._id,
			};
			return { value: jwt.sign(userToken, process.env.JWT_SECRET) };
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

startStandaloneServer(server, {
	listen: { port: 4000 },
	context: async ({ req, res }) => {
		const auth = req ? req.headers.authorization : null;
		if (auth && auth.startsWith("Bearer ")) {
			const decodedToken = jwt.verify(
				auth.substring(7),
				process.env.JWT_SECRET
			);
			const currentUser = await User.findById(decodedToken.id);
			return { currentUser };
		}
	},
}).then(({ url }) => {
	console.log(`Server ready at ${url}`);
});
