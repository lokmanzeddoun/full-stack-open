const { GraphQLError } = require("graphql");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();
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
		allAuthors: async () => {
			console.log("Author.find");
			return Author.find({}).populate("books");
		},
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
			let book = new Book({ ...args, author: author._id });
			try {
				await book.save();
				author.books = author.books.concat(book.id);
				await author.save();
			} catch (error) {
				throw new GraphQLError(`title must be at least 5 and unique`, {
					extensions: {
						code: "BAD_USER_INPUT",
						invalidArgs: args.title,
						error,
					},
				});
			}
			const newBook = await Book.findById(book.id).populate("author");
			pubsub.publish("BOOK_ADDED", { bookAdded: newBook });
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
	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
		},
	},
};

module.exports = resolvers;
