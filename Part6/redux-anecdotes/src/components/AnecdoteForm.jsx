import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { showNotification } from "../reducers/notificationReducer";
const AnecdoteForm = () => {
	const dispatch = useDispatch();
	const submitNewNote = (e) => {
		e.preventDefault();
		dispatch(createAnecdote(e.target.anecdotes.value));
		dispatch(
			showNotification(`You added new anecdote "${e.target.anecdotes.value}"`)
		);
		setTimeout(() => {
			dispatch(showNotification(""));
		}, 5000);
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
