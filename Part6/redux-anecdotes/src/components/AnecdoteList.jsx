import { useSelector, useDispatch } from "react-redux";
import { createVote } from "../reducers/anecdoteReducer";
const AnecdoteList = () => {
	const anecdotes = useSelector((state) => {
		
		if (state.filter === null) {
			return state.anecdotes.sort((a, b) => b.votes - a.votes);
		}
		return state.anecdotes
			.filter((anecdote) =>
				anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
			)
			.sort((a, b) => b.votes - a.votes);
	});
	const dispatch = useDispatch();

	const vote = (id) => {
		dispatch(createVote(id));
	};
	return (
		<div>
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default AnecdoteList;
