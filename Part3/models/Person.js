import mongoose from "mongoose"

mongoose.set("strictQuery", false)

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: [3, "Must be at least 3 , got {VALUE}"],
		required: true,
	},
	number: {
		type: String,
		minLength: [8, "Must be at least 8 , got {VALUE}"],
		validate: {
			validator: (v) => {
				return /^\d{2,3}-\d{7,}/.test(v)
			},
			message: (props) => `${props.value} is not a valid phone number !`,
		},
		required: true,
	},
})

export default mongoose.model("Person", personSchema)
