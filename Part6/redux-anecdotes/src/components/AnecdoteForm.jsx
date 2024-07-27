import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { showNotification } from "../reducers/notificationReducer";
import anecdoteService from "../../services/anecdotes";
const AnecdoteForm = () => {
	const dispatch = useDispatch();
	const submitNewNote = async (e) => {
		e.preventDefault();
		const content = e.target.anecdotes.value;
		e.target.anecdotes.value = "";
		const newAnecdote = await anecdoteService.createNew(content);
		dispatch(createAnecdote(newAnecdote));
		dispatch(showNotification(`You added new anecdote "${content}"`));
		setTimeout(() => {
			dispatch(showNotification(""));
		}, 5000);
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
