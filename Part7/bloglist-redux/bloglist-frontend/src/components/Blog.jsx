import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { likeBlog, removeBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Link } from "react-router-dom";
const Blog = ({ blog }) => {
	const dispatch = useDispatch();
	const authUser = useSelector((state) => state.user);
	Blog.prototypes = {
		blog: PropTypes.object.isRequired,
	};
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	};
	// const [visible, setVisible] = useState("");
	// const hideWhenVisible = { display: visible ? "none" : "" };
	// const showWhenVisible = { display: visible ? "" : "none" };
	// const toggleVisibility = () => {
	// 	setVisible(!visible);
	// };
	// const handleLike = () => {
	// 	dispatch(likeBlog(blog));
	// 	dispatch(setNotification(`You vote like for ${blog.title}`, 2));
	// };

	// const handleDelete = () => {
	// 	if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
	// 		dispatch(removeBlog(blog.id));
	// 		dispatch(setNotification(`You Delete ${blog.title}`, 2));
	// 	}
	// };
	return (
		<div style={blogStyle}>
			<Link to={`/blogs/${blog.id}`}>
				{blog.title} {blog.author}
			</Link>
		</div>
	);
};

export default Blog;
