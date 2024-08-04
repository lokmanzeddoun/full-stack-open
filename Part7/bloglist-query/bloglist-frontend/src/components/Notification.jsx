const Notification = ({ message,error }) => {
	return message === null ? null : (
		<div className="msg" style={{ color: error ? "red" : "green" }}>
			{message}
		</div>
	);
};

export default Notification;
