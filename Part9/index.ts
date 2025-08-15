import express from "express"

const app = express()
import { calculateBmi } from "./bmiCalculator"

app.get("/", (_req, res) => {
    res.send("Hello World")
})
app.get("/bmi", (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    // Validate
    if (isNaN(height) || isNaN(weight)) {
        return res.status(400).json({ error: "malformatted parameters" });
    }

    const bmi = calculateBmi(height, weight);

    return res.json({
        height,
        weight,
        bmi
    });
});


const PORT = 3003

app.listen(PORT, () => {
    console.log(`Server Is Listening On Port ${PORT}`)
})