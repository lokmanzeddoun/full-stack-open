import express from 'express';
import diagnoseService from '../services/diagnoseService';
import { Diagnosis } from "../type";
import { Response } from 'express';
const router = express.Router();


router.get('/', (_req, res: Response<Diagnosis[]>) => {
    res.send(diagnoseService.fetchDiagnoses());
});


export default router;