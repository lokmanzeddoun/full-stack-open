import { useDispatch } from "react-redux";
import { createComments } from "../reducers/comment";
import { setNotification } from "../reducers/notificationReducer";

const AddComment = ({ id }) => {
	const dispatch = useDispatch();

	const addComment = async (event) => {
		event.preventDefault();

		const newComment = event.target.comment.value;

		event.target.comment.value = "";

		dispatch(createComments(id, newComment));
		dispatch(setNotification(`a new comment ${newComment} added`, 5));
	};

	return (
		<div>
			<form onSubmit={addComment}>
				<input name="comment" />
				<button type="submit">add comment</button>
			</form>
		</div>
	);
};

export default AddComment;
