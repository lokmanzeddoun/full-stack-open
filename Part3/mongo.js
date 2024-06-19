import mongoose from 'mongoose'
if (process.argv.length < 3) {
	console.log("give password as argument");
	process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://lokmanezeddoun:${password}@phonebook.5jf0kb0.mongodb.net/?retryWrites=true&w=majority&appName=phonebook`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
	name: String,
	number: Number,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
	Person.find({}).then((result) => {
		console.log("phonebook: ");
		result.forEach((person) => {
			console.log(`${person.name} ${person.number}`);
		});
		mongoose.connection.close();
	});
} else {
	const person = new Person({
		name: process.argv[3],
		number: process.argv[4],
	});

	person.save().then((result) => {
		console.log(`added ${result.name} number ${result.number} to phonebook`);
		mongoose.connection.close();
	});
}
