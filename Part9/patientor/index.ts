import express from 'express';
import cors from "cors";
const app = express();

import diagnoseRouter from "./routes/diagnose";
app.use(express.json());
app.use(cors());
const PORT = 3001;
app.use('/api/diagnoses', diagnoseRouter);
app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});