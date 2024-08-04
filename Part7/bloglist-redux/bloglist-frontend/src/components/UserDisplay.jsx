import { useSelector } from "react-redux";

const UserDisplay = () => {
	const displayUsers = useSelector((state) => state.users);

	return (
		<div>
			<h2>Users</h2>
			<table>
				<tbody>
					<tr>
						<td>{}</td>
						<td>
							<h5>blogs created</h5>
						</td>
					</tr>
					{displayUsers.map((displayUser) => (
						<tr key={displayUser.id}>
							<td>{displayUser.username}</td>
							<td>{displayUser.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default UserDisplay;
