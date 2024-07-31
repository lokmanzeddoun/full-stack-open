import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Todo from "../src/Todos/Todo";

describe("test Todo ", () => {
	const NotDoneTodo = {
		text: "Javascript Closure",
		done: false,
	};

	const DoneTodo = {
		text: "Typescript Inference",
		done: true,
	};

	const mockHandler = vi.fn();
	render(
		<Todo
			todo={NotDoneTodo}
			onClickDelete={mockHandler}
			onClickComplete={mockHandler}
		/>
	);

	const notDoneText = screen.getByText(NotDoneTodo.text);
	const notDoneStatus = screen.getByText("This todo is not done");
	const notDoneDeleteButton = screen.getByText("Delete");
	const notDoneCompleteButton = screen.getByText("Set as done");

	test("render content not done Todo", () => {
		expect(notDoneText).toBeDefined();
		expect(notDoneStatus).toBeDefined();
		expect(notDoneDeleteButton).toBeDefined();
		expect(notDoneCompleteButton).toBeDefined();
	});

	test("render content todo done", () => {
		const { container } = render(
			<Todo
				todo={DoneTodo}
				onClickDelete={mockHandler}
				onClickComplete={mockHandler}
			/>
		);
		const div = container.querySelector(".todo");
		expect(div).toHaveTextContent(
			DoneTodo.text && "This todo is done" && "Delete"
		);
		expect(div).not.toHaveTextContent("Set as done");
	});
});
