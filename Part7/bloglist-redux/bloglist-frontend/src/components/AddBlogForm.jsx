import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";
import { setIsError } from "../reducers/errorReducer";
import Togglable from "./Togglable";
import { InputGroup, Form, Button } from "react-bootstrap";
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
		dispatch(createBlog(blog));
		dispatch(
			setNotification(`a new  blog ${blog.title} added	 by ${blog.author}`, 2),
		);
		setTitle("");
		setAuthor("");
		setUrl("");
	};

	return (
		<Form onSubmit={handleSubmit}>
			<h2>Create blog</h2>
			<Togglable buttonLabel={`create blog`} ref={blogRef}>
				<InputGroup className="mb-3">
					<InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
					<Form.Control
						placeholder="Title"
						aria-label="Title"
						aria-describedby="basic-addon1"
						name="title"
						value={title}
						data-testid="title"
						onChange={(e) => {
							setTitle(e.target.value);
						}}
					/>
				</InputGroup>
				<InputGroup className="mb-3">
					<InputGroup.Text id="basic-addon1">Author</InputGroup.Text>
					<Form.Control
						placeholder="Author"
						aria-label="Author"
						aria-describedby="basic-addon1"
						name="author"
						value={author}
						data-testid="author"
						onChange={(e) => {
							setAuthor(e.target.value);
						}}
					/>
				</InputGroup>
				<InputGroup className="mb-3">
					<InputGroup.Text id="basic-addon3">
						https://example.com/users/
					</InputGroup.Text>
					<Form.Control
						placeholder="URL"
						aria-label="URL"
						aria-describedby="basic-addon1"
						name="url"
						value={url}
						data-testid="url"
						onChange={(e) => {
							setUrl(e.target.value);
						}}
					/>
				</InputGroup>
				<Button type="submit">create</Button>
			</Togglable>
		</Form>
	);
};

export default AddBlogForm;
