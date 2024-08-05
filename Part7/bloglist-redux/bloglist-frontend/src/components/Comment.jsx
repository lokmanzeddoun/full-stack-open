import { useDispatch, useSelector } from "react-redux";
import AddComment from "./AddComment";
import { useEffect } from "react";
import { initializeAllComments } from "../reducers/comment";

const Comment = ({ id }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(initializeAllComments(id));
	}, [dispatch]);
	const comments = useSelector((state) => state.comment);
	return (
		<div>
			<h3>comments</h3>
			<AddComment id={id} />
			{comments.map((comment) => (
				<li key={comment.id}>{comment.content}</li>
			))}
		</div>
	);
};

export default Comment;
