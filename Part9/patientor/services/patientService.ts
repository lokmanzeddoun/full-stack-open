import data from "../data/patient";
import { NonSensetivePatientEntry } from "../type";

const fetchAll = (): NonSensetivePatientEntry[] => {
    return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {
    fetchAll
};