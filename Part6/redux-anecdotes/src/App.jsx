import { useSelector, useDispatch } from "react-redux";
import { createVote, createAnecdote } from "./reducers/anecdoteReducer";
const App = () => {
	const anecdotes = useSelector((state) => state);
	const dispatch = useDispatch();

	const vote = (id) => {
		console.log("vote", id);
		dispatch(createVote(id));
	};
	const submitNewNote = (e) => {
		e.preventDefault();
		dispatch(createAnecdote(e.target.anecdotes.value));
		e.target.anecdotes.value = "";
	};

	return (
		<div>
			<h2>Anecdotes</h2>
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}
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

export default App;
