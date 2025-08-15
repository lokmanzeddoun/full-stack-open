
const parse = (args: string[]): number[] => {
    if (args.length < 4) throw new Error('Not enough arguments');
    // args.ts
    return process.argv.slice(2).map(arg => {
        const num = Number(arg);
        if (isNaN(num)) {
            throw new Error(`Invalid number: "${arg}"`);
        }
        return num;
    });
}

interface resultObject {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

function exerciseCalculator(exercices: number[], target: number): resultObject {
    let sum = 0, trainingDays = 0;
    let success = true;
    for (let ex of exercices) {
        if (ex > 0) { trainingDays += 1 }
        if (ex < target) (success = false)
        sum += ex
    }
    // calculate the rating 
    let rating = 1

    let ratingDescription = ""
    let avg = sum / exercices.length
    if (avg >= target) {
        rating = 3
        ratingDescription = "well done keep going"
    } else if (avg >= (target / 2) && avg < target) {
        rating = 2
        ratingDescription = "not too bad but could be better"
    } else {
        ratingDescription = "very bad you need to expand more hours"
    }
    return {
        periodLength: exercices.length,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average: avg
    }
}
try {
    const arr = parse(process.argv)
    console.log(exerciseCalculator(arr.slice(1), arr[0]))
} catch (err: unknown) {
    let errorMessage = 'Something bad happened.'
    if (err instanceof Error) {
        errorMessage += ' Error: ' + err.message;
    }
    console.log(errorMessage);
}
// console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2))