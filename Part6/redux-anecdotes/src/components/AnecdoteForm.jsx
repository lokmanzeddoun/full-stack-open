import { createAnecdotes } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
const AnecdoteForm = () => {
	const dispatch = useDispatch();
	const submitNewNote = async (e) => {
		e.preventDefault();
		const content = e.target.anecdotes.value;
		e.target.anecdotes.value = "";
		dispatch(createAnecdotes(content));
		dispatch(setNotification(`You added new anecdote "${content}"`,5));
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
