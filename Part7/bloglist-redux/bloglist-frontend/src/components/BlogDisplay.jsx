import { useDispatch, useSelector } from "react-redux";
import { likeBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useParams } from "react-router-dom";
import Comment from "./Comment";

const BlogDisplay = () => {
	const dispatch = useDispatch();

	const blogs = useSelector((state) => state.blogs);

	const id = useParams().id;
	const blog = blogs.find((n) => n.id === String(id));

	if (!blog) {
		return null;
	}

	const handleLike = () => {
		dispatch(likeBlog(blog));
		dispatch(setNotification(`You added one like for "${blog.title}" !`, 5));
	};

	return (
		<div>
			<h2>
				{blog.title} {blog.author}
			</h2>
			<p>{blog.url}</p>
			<p>
				{blog.likes}
				<button onClick={handleLike}>likes</button>
			</p>
			<p>added by {blog.user !== null && blog.user.name}</p>
			<Comment id={blog.id} />
		</div>
	);
};

export default BlogDisplay;
