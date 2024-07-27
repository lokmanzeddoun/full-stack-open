import { useQuery } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes } from "./services/request";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateVote } from "./services/request";
import { useNotificationDispatch } from "./notificationContext";

const App = () => {
	const queryClient = useQueryClient();
	const dispatch = useNotificationDispatch();

	const updateVoteMutation = useMutation({
		mutationFn: updateVote,
		onSuccess: (updatedAnecdote) => {
			console.log("update", updatedAnecdote);

			const anecdotes = queryClient.getQueryData(["anecdotes"]);

			queryClient.setQueryData(
				["anecdotes"],
				anecdotes.map((anecdote) =>
					anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
				)
			);
		},
	});
	const handleVote = async (anecdote) => {
		updateVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
		await dispatch({
			type: "SET_NOTIFICATION",
			payload: `You voted for : ${anecdote.content}`,
		});

		setTimeout(() => {
			dispatch({ type: "CLEAR_NOTIFICATION" });
		}, 5000);
		console.log("vote");
	};
	const result = useQuery({
		queryKey: ["anecdotes"],
		queryFn: getAnecdotes,
		retry: 1,
		refetchOnWindowFocus: false,
	});
	console.log(JSON.parse(JSON.stringify(result)));
	if (result.isLoading) {
		return <div>loading data...</div>;
	}
	if (result.isError) {
		return <div>anecdote service not available due to problems in server</div>;
	}
	const anecdotes = result.data;

	return (
		<div>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm />

			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>vote</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default App;
