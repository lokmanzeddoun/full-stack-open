const Blog = ({ blog }) => (
	<div>
		<b>Title :</b>
		{blog.title} | <b>Author :</b> {blog.author}
	</div>
);

export default Blog