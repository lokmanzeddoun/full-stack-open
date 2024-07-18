import React from "react";
import { useState } from "react";

const AddBlogForm = ({ handleSubmit }) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");
	return (
		<div>
			<h2>Create blog</h2>
			<form onSubmit={handleSubmit}>
				<div>
					Title:
					<input
						type="text"
						name="title"
						value={title}
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
						onChange={(e) => {
							setUrl(e.target.value);
						}}
					/>
				</div>
				<button type="submit">Create</button>
			</form>
		</div>
	);
};

export default AddBlogForm;
