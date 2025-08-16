import express from "express";

const app = express();
import { calculateBmi } from "./bmiCalculator";
import { exerciseCalculator } from "./exerciseCalculator";

app.use(express.json());
app.get("/", (_req, res) => {
    res.send("Hello World");
});
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
app.post("/exercices", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { target, daily_exercises } = req.body;
    if (!Array.isArray(daily_exercises) || isNaN(Number(target))) { return res.status(400).send({ error: 'malformatted parameters' }); }
    const exercices = daily_exercises as number[];
    const result = exerciseCalculator(exercices, Number(target));
    return res.json({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server Is Listening On Port ${PORT}`);
});