import express from "express"

const app = express()

app.get("/", (_req, res) => {
    res.send("Hello World")
})


const PORT = 3003

app.listen(PORT, () => {
    console.log(`Server Is Listening On Port ${PORT}`)
})