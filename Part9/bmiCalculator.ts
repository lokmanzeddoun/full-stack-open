function calculateBmi(height: number, weight: number): string {
    let bmi = weight / (((height/100) ** 2) )
    if (bmi <= 18.5) {
        return "Underweight range"
    }
    else if (18.5 < bmi && bmi < 25) {
        return "Normal range"
    }
    else if (bmi >= 25 && bmi < 30) {
        return "Overweight range"
    }
    else {
        return "Obeese range"
    }
}
console.log(calculateBmi(180, 74))