import { useState } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";
import { setIsError } from "../reducers/errorReducer";
import Togglable from "./Togglable";
import { useRef } from "react";
const AddBlogForm = () => {
	const blogRef = useRef();
	const dispatch = useDispatch();
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");
	const handleSubmit = (e) => {
		e.preventDefault();
		const blog = {
			title,
			author,
			url,
		};
		try {
			dispatch(createBlog(blog));
			dispatch(
				setNotification(`a new  blog ${blog.title} added	 by ${blog.author}`, 2),
			);
		} catch (error) {
			dispatch(
				setNotification(`You are not allowed to perform this action`, 2),
			);
			setIsError(2);
		}
		setTitle("");
		setAuthor("");
		setUrl("");
	};
	return (
		<div>
			<Togglable buttonLabel={`create blog`} ref={blogRef}>
				<h2>Create blog</h2>
				<form onSubmit={handleSubmit}>
					<div>
						Title:
						<input
							type="text"
							name="title"
							value={title}
							data-testid="title"
							onChange={(e) => {
								setTitle(e.target.value);
							}}
						/>
					</div>
					<div>
						Author:
						<input
							type="text"
							name="author"
							value={author}
							data-testid="author"
							onChange={(e) => {
								setAuthor(e.target.value);
							}}
						/>
					</div>
					<div>
						URL:
						<input
							type="text"
							name="url"
							value={url}
							data-testid="url"
							onChange={(e) => {
								setUrl(e.target.value);
							}}
						/>
					</div>
					<button type="submit">create</button>
				</form>
			</Togglable>
		</div>
	);
};

export default AddBlogForm;
