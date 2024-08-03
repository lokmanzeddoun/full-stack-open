import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("Blog Component", () => {
	const blog = {
		id: "1",
		title: "Test blog",
		author: "Test author",
		url: "http://test.com",
		likes: 10,
		user: {
			username: "test username",
			name: "test name",
		},
	};
	const likesMockHandler = vi.fn();
	beforeEach(() => {
		render(<Blog key={blog.id} blog={blog} addLikes={likesMockHandler} />);
	});

	test("render content", () => {
		expect(screen.getByText(blog.title)).toBeDefined();
		expect(screen.getByText(blog.author)).toBeDefined();
		expect(screen.queryByText(blog.url)).toBeNull();
		expect(screen.queryByText("like")).toBeNull();
	});
	test("the url and likes are displayed when the button that controls the details is clicked", async () => {
		const user = userEvent.setup();
		const button = screen.getByText("view");
		await user.click(button);

		expect(screen.getByText(blog.url)).toBeDefined();
		expect(screen.getByText("like")).toBeDefined();
	});
	test("the event handler that the component received as props is called twice", async () => {
		const user = userEvent.setup();
		const viewButton = screen.getByText("view");
		await user.click(viewButton);

		const likeButton = screen.getByText("like");
		await user.click(likeButton);
		await user.click(likeButton);

		expect(likesMockHandler.mock.calls).toHaveLength(2);
	});
});
