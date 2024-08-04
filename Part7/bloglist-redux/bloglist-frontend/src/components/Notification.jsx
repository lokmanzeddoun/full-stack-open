import { useSelector } from "react-redux";
const Notification = ({ error }) => {
	const notification = useSelector((state) => state.notification);
	return notification === null ? null : (
		<div className="msg" style={{ color: error ? "red" : "green" }}>
			{notification}
		</div>
	);
};

export default Notification;
