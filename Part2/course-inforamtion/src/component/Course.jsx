/* eslint-disable react/prop-types */
const Part = ({ part }) => (
	<p>
		{part.name} {part.exercises}
	</p>
);
const Header = ({ course }) => <h1>{course}</h1>;
const Content = ({ parts }) => (
	<>
		{parts.map((part) => {
			return <Part part={part} key={part.id} />;
		})}
	</>
);
const Total = ({ parts }) => {
	const totalAmount = parts.reduce((sum, order) => sum + order.exercises, 0);
	return (
		<div>
			<p style={{fontWeight:"bold"}}>total of {totalAmount} exercises</p>
		</div>
	);
};
const Course = ({ course }) => (
	<>
		<Header course={course.name} />
		<Content parts={course.parts} />
		<Total parts={course.parts} />
	</>
);
export default Course;
