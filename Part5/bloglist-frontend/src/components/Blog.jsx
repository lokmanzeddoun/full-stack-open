import PropTypes from "prop-types";
import { useState } from "react";
const Blog = ({ blog, addLikes, deleteBlog }) => {
	Blog.prototypes = {
		blog: PropTypes.object.isRequired,
		addLikes: PropTypes.func.isRequired,
		deleteBlog: PropTypes.func.isRequired,
	};
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	};
	const [visible, setVisible] = useState("");
	const hideWhenVisible = { display: visible ? "none" : "" };
	const showWhenVisible = { display: visible ? "" : "none" };

	const toggleVisibility = () => {
		setVisible(!visible);
	};
	const handleLike = () => {
		const blogObject = {
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: blog.likes + 1,
		};
		addLikes(blog.id, blogObject);
	};

	const handleDelete = () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			deleteBlog(blog.id);
		}
	};
	return (
		<div style={blogStyle} className="blog">
			<div style={hideWhenVisible}>
				<span>{blog.title} </span>
				<span>{blog.author} </span>
				<button onClick={toggleVisibility}>view</button>
			</div>
			{visible ? (
				<div style={showWhenVisible}>
					<span>{blog.title} </span>
					<span>{blog.author} </span>
					<button onClick={toggleVisibility}>hide</button>
					<p>{blog.url}</p>
					<p>
						likes {blog.likes}
						<button onClick={handleLike}>like</button>
					</p>
					<p>{blog.user !== null && blog.user.name}</p>
					<button onClick={handleDelete}>remove</button>
				</div>
			) : null}
		</div>
	);
};

export default Blog;
