import mongoose from "mongoose"
import express from "express"
import cors from "cors"
import morgan from "morgan"
import Person from "./models/Person.js"
const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
morgan.token("body", (request) => JSON.stringify(request.body))
app.use(express.json())
app.use(morgan("tiny"))
app.use(express.static("dist"))
app.get("/api/persons", async (req, res, next) => {
  try {
    const persons = await Person.find()
    res.status(200).json(persons)
  } catch (error) {
    next(error)
  }
})
app.get("/info", async (req, res, next) => {
  const currentDate = new Date()
  try {
    const persons = await Person.find()

    const htmlContent = `<p>PhoneBook has info for ${persons.length}  people </p>
	<p>${currentDate}</p>`
    res.status(200).send(htmlContent)
  } catch (error) {
    next(error)
  }
})
app.get("/api/persons/:id", async (req, res, next) => {
  try {
    const p = await Person.findById(req.params.id)
    res.status(200).json(p)
  } catch (error) {
    next(error)
  }
})
app.delete("/api/persons/:id", async (req, res, next) => {
  try {
    await Person.findByIdAndDelete(req.params.id)
    res.status(204).send()
  } catch (error) {
    next(error)
  }
})
const postMorgan = morgan(
  ":method :url :status :res[content-length] - :response-time ms :body"
)
app.post("/api/persons", postMorgan, async (req, res, next) => {
  const { name, number } = req.body
  if (!name || !number) {
    return res
      .status(400)
      .json({ error: "You must include name and number in the request" })
  } else if (await Person.findOne({ name })) {
    console.log("what")
    return res.status(400).json({ error: "name must be unique" })
  }
  try {
    const result = await Person.create(req.body)
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
})
app.put("/api/persons/:id", async (req, res, next) => {
  try {
    const person = await Person.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        number: req.body.number,
      },
      { new: true, runValidators: true }
    )
    res.status(200).json(person)
  } catch (error) {
    next(error)
  }
})
// for handling the Unknown Endpoint
app.all("*", (req, res, next) => {
  next(new Error(`Can't find this route: ${req.originalUrl}`))
})
// errorHandler
const errorHandler = (err, req, res, next) => {
  console.log(err.message)
  if (err.name === "CastError") {
    return res.status(400).send({ error: "mal formatted id" })
  } else if (err.name === "ValidationError") {
    return res
			.status(400)
			.send({ error: err.message, type: "ValidationError" })
  }
  next(err)
}
app.use(errorHandler)
app.listen(PORT, () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to Mongodb Atlas")
      console.log(`Server is Listening On port ${PORT}`)
    })
    .catch((err) => {
      console.log(`error connecting to mongoDB ${err.message}`)
      process.exit(1)
    })
})
