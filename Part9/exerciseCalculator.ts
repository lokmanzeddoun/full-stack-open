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
console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2))