import { useSelector } from "react-redux";
const Notification = () => {
	const notification = useSelector((state) => state.notification);
	const error  = useSelector((state) => state.error)
	return notification === null ? null : (
		<div className="msg" style={{ color: error ? "red" : "green" }}>
			{notification}
		</div>
	);
};

export default Notification;
