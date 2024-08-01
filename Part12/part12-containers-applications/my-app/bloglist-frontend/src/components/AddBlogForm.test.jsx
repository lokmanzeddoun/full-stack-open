import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddBlogForm from "./AddBlogForm";

describe("Blog Form Component", () => {
	test("the form calls the event handler which received as props with correct details", async () => {
		const user = userEvent.setup();
		const createBlogMockHandler = vi.fn();
		const { container } = render(
			<AddBlogForm createBlog={createBlogMockHandler} />
		);
		const titleInput = container.querySelector('input[name="title"]');
		const authorInput = container.querySelector('input[name="author"]');
		const urlInput = container.querySelector('input[name="url"]');
		const createButton = screen.getByText("Create");

		await user.type(titleInput, "Test title");
		await user.type(authorInput, "Test author");
		await user.type(urlInput, "http://test.com");
		await user.click(createButton);

		expect(createBlogMockHandler.mock.calls).toHaveLength(1);
		expect(createBlogMockHandler.mock.calls[0][0]).toEqual({
			title: "Test title",
			author: "Test author",
			url: "http://test.com",
		});
	});
});
