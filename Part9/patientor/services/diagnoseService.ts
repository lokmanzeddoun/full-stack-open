import { Diagnosis } from "../type";
import diagnoseData from "../../data/diagnoses";


const fetchDiagnoses = (): Diagnosis[] => {
    return diagnoseData;
};



export default {
    fetchDiagnoses
};
