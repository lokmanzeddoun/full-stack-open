import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
const AnecdoteForm = () => {
	const dispatch = useDispatch();
	const submitNewNote = (e) => {
		e.preventDefault();
		console.log(e.target.anecdotes.value);
		dispatch(createAnecdote(e.target.anecdotes.value));
		e.target.anecdotes.value = "";
	};
	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={submitNewNote}>
				<div>
					<input name="anecdotes" />
				</div>
				<button>create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
