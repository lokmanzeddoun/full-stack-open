import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createAnecdote } from "../services/request";
import { useNotificationDispatch } from "../notificationContext";
const AnecdoteForm = () => {
	const dispatch = useNotificationDispatch();
	const queryClient = useQueryClient();

	const newAnecdoteMutation = useMutation({
		mutationFn: createAnecdote,
		onSuccess: (newAnecdote) => {
			console.log(newAnecdote);
			const anecdotes = queryClient.getQueryData(["anecdotes"]);
			queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
		},
		onError: () => {
			dispatch({
				type: "SET_NOTIFICATION",
				payload: "too short anecdote,must have length 5 or more",
			});
			setTimeout(() => {
				dispatch({
					type: "CLEAR_NOTIFICATION",
				});
			}, 5000);
		},
	});

	const getId = () => (100000 * Math.random()).toFixed(0);
	const onCreate = async (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = "";
		newAnecdoteMutation.mutate({ content, id: getId(), votes: 0 });
		dispatch({
			type: "SET_NOTIFICATION",
			payload: `You Added a new Anecdote ${content}`,
		});
		setTimeout(() => {
			dispatch({
				type: "CLEAR_NOTIFICATION",
			});
		}, 5000);
		console.log("new anecdote");
	};

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name="anecdote" />
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
