import express from 'express';
import patientService from '../services/patientService';
const router = express.Router();
import { Response } from 'express';
import { NonSensetivePatientEntry } from '../type';
router.get('/', (_req, res: Response<NonSensetivePatientEntry[]>) => {
    res.send(patientService.fetchAll());
});

export default router;