import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
const BlogList = () => {
	const blogs = useSelector((state) => {
		return state.blogs.slice().sort((a, b) => b.likes - a.likes);
	});

	return (
		<ListGroup>
			{blogs.map((blog) => (
				<ListGroup.Item
					action
					variant="dark"
					key={blog.id}
					href={`/blogs/${blog.id}`}
				>
					{blog.title} {blog.author}
				</ListGroup.Item>
			))}
		</ListGroup>
	);
};

export default BlogList;
