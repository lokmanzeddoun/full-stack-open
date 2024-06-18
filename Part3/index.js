import express from "express";
import cors from "cors";
import morgan from "morgan";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
morgan.token("body", (request) => JSON.stringify(request.body));
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("build"));
let persons = [
	{
		id: 1,
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: 2,
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: 3,
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: 4,
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
];
app.get("/api/persons", (req, res, next) => {
	res.status(200).json(persons);
});//full-stack-open-2yxj.onrender.com
https: app.get("/info", (req, res, next) => {
	const currentDate = new Date();
	const htmlContent = `<p>PhoneBook has info for ${persons.length}  people </p>
<p>${currentDate}</p>`;
	res.status(200).send(htmlContent);
});
app.get("/api/persons/:id", (req, res, next) => {
	const p = persons.find((item) => item.id === +req.params.id);
	res.status(200).json(p);
});
app.get("/", (req, res, next) => {
	res.send(`<h1> Hello To The phonebook backend app</h1>`)
})
app.delete("/api/persons/:id", (req, res, next) => {
	const p = persons.filter((item) => item.id !== +req.params.id);
	persons = p;
	res.status(204).send();
});
const postMorgan = morgan(
	":method :url :status :res[content-length] - :response-time ms :body"
);
app.post("/api/persons", postMorgan, (req, res, next) => {
	const generatedId = Math.round(Math.random() * 6000);
	const { name, number } = req.body;
	if (!name || !number) {
		return res
			.status(400)
			.json({ error: "You must include name and number in the request" });
	} else if (persons.some((p) => p.name === name)) {
		return res.status(400).json({ error: "name must be unique" });
	}
	const newPerson = {
		id: generatedId,
		name,
		number,
	};
	persons = persons.concat(newPerson);
	res.status(200).json(newPerson);
});
app.all("*", (req, res, next) => {
	next(new Error(`Can't find this route: ${req.originalUrl}`));
});
app.listen(PORT, () => {
	console.log(`Server is Listening On port ${PORT}`);
});
